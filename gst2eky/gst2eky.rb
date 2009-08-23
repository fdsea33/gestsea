def require_library_or_gem(library_name)
  begin
    require library_name
  rescue LoadError => cannot_require
    # 1. Requiring the module is unsuccessful, maybe it's a gem and nobody required rubygems yet. Try.
    begin
      require 'rubygems'
    rescue LoadError => rubygems_not_installed
      raise cannot_require
    end
    # 2. Rubygems is installed and loaded. Try to load the library again
    begin
      require library_name
    rescue LoadError => gem_not_installed
      raise cannot_require
    end
  end
end


begin
  require_library_or_gem 'pg'
rescue LoadError => e
  begin
    require_library_or_gem 'postgres'
    class PGresult
      alias_method :nfields, :num_fields unless self.method_defined?(:nfields)
      alias_method :ntuples, :num_tuples unless self.method_defined?(:ntuples)
      alias_method :ftype, :type unless self.method_defined?(:ftype)
      alias_method :cmd_tuples, :cmdtuples unless self.method_defined?(:cmd_tuples)
    end
  rescue LoadError
    raise e
  end
end


require 'schema_hash'

NULL = "NULL"

def log(*args)
  puts "B> "+args[0], *args[1..-1]
end

class Migrator

  def colorize(array)
    array.sort{|a,b| a.to_s<=>b.to_s}.collect do |x|
      if x.to_s.match(/_id$/)
        "\033\[01;32m#{x}\033\[00m"
      elsif x.to_s.match(/_numero$/)
        "\033\[01;34m#{x}\033\[00m"
      else
        x
      end
    end.join(", ")
  end

  def stamps(exists=true)
    if exists.is_a? FalseClass
      return {:created_at=>'CURRENT_TIMESTAMP', :updated_at=>'CURRENT_TIMESTAMP', :creator_id=>NULL, :updater_id=>NULL, :lock_version=>0}
    else
      prefix = ''
      prefix = exists+'.' if exists.is_a? String
      return {:created_at=>"#{prefix}created_at", :updated_at=>"#{prefix}updated_at", :creator_id=>"#{prefix}created_by", :updater_id=>"#{prefix}updated_by", :lock_version=>"#{prefix}lock_version"}
    end
  end
  








  def rows_sql(reflection, result, columns)
    cols = columns.sort{|a,b| a[1][:name]<=>b[1][:name]}
    values = cols.collect do |column, attrs|
      r = "result.getvalue(i,#{attrs[:index]})"
      "(#{r}.nil? ? '\\N' : "+if attrs[:name].match(/^(cre|upd)ated_at$/)
                                "(#{r}||Time.now).to_s"
                              elsif attrs[:name].match(/^(cre|upd)at(o|e)r_id$/)
                                "@users[#{r}].to_s"
                              elsif attrs[:type] == :bool
                                "(#{r}=='t' ? 'true' : 'false')"
                              elsif attrs[:type] == :int4
                                "#{r}.to_s"
                              else
                                "#{r}.to_s.gsub(/\\n/,\"\\\\n\").gsub(/\\t/,\"\\\\t\")"
                              end+")"
    end.join("+\"\t\"+")
    count = result.num_tuples
    log "  count: "+count.to_s unless @debug
    code = ''
    if count>3000
      part = (count/10).to_i
      for x in 0..9
        code += "for i in #{x*part}..#{(x==9 ? count : (x+1)*part)-1}\n"
        code += "  @file.write("+values+"+\"\\n\")\n"
        code += "end\n"
        code += "log '.'\n" unless @debug
      end
    else
      code += "result.num_tuples.times do |i|\n"
      code += "  @file.write("+values+"+\"\\n\")\n"
      code += "end\n"
    end
    # raise Exception.new code
    @file.write "COPY #{reflection} (#{cols.collect{|a| a[1][:name]}.join(', ')}) FROM stdin;\n"
    eval(code)
    @file.write "\\.\n"
  end









  def rows_xml(reflection, result, columns)
    # log columns.inspect
    values = columns.sort{|a,b| a[1][:name]<=>b[1][:name]}.collect do |column, attrs|
      r = "result.getvalue(i,#{attrs[:index]})"
      attrs[:name]+"=\\\"\"+"+
        if attrs[:name].match(/^(cre|upd)ated_at$/)
          "(#{r}||Time.now).to_s"
        elsif attrs[:name].match(/^(cre|upd)at(o|e)r_id$/)
          "@users[#{r}].to_s"
        elsif attrs[:type] == :bool
          "((v=#{r})=='t' ? 'true' : (v=='f' ? 'false' : ''))"
        elsif attrs[:type] == :int4
          "#{r}.to_s"
        else
          "#{r}.to_s.gsub(\"&\",\"&amp;\").gsub('\"',\"&quot;\").gsub(\"<\",\"&lt;\").gsub(\">\",\"&gt;\")"
        end+"+\"\\\""
    end.join(" ")
    count = result.num_tuples
    log "  count: "+count.to_s unless @debug
    code = ''
    if count>3000
      part = (count/10).to_i
      for x in 0..9
        code += "for i in #{x*part}..#{(x==9 ? count : (x+1)*part)-1}\n"
        code += "  @file.write(\"      <row "+values+"/>\\n\"\n)"
        code += "end\n"
        code += "log '  - #{(x==9 ? count : (x+1)*part)}'\n" unless @debug
      end
    else
      code += "result.num_tuples.times do |i|\n"
      code += "  @file.write(\"      <row "+values+"/>\\n\")\n"
      code += "end\n"
    end
    # raise Exception.new code
    @file.write "    <rows reflection=\"#{reflection}\" records-count=\"#{count}\">\n"
    eval(code)
    @file.write "    </rows>\n"
  end


  def generate_query(options={})
    if options[:select].is_a? Hash
      st = options[:select].delete(:_stamps)
      options[:select].merge!(stamps(options[:from] ? st : false)) 
    end
    options[:limit] ||= (@debug ? 500 : nil)
    query  = "SELECT "
    if options[:distinct].is_a? TrueClass
      query += "DISTINCT " 
    elsif options[:distinct].is_a? Array
      query += "DISTINCT ON ("+options[:distinct].join(", ")+") "
    end

    if options[:select].is_a? Hash
      query += options[:select].collect{|k, v| v.to_s+" AS "+k.to_s}.join(", ")
    else
      query += "*"
    end
    query += " FROM "+options[:from] if options[:from]
    query += " WHERE "+options[:conditions] if options[:conditions]
    query += " LIMIT "+options[:limit].to_s if options[:limit]
    return query
  end

  def rows(reflection, options={})
    log(reflection.to_s+(options[:select] ? "["+options[:select].keys.size.to_s+"]" : "")) unless @debug
    raise Exception.new(reflection.inspect) if EKYLIBRE[reflection].nil?
    @reflections.delete reflection
    
    
    all_columns = []
    if @debug
      if options[:from]
        query = generate_query(options.merge(:select=>nil, :limit=>1))
        result = @conn.exec(query) 
        all_columns = result.fields.collect{|x| x.to_sym}
        all_columns -= [:created_at, :updated_at, :created_by, :updated_by, :lock_version, :id]
      end
    end

    query = generate_query(options)
    # puts query
    result = @conn.exec(query) 
    
    columns = {}
    result.fields.size.times do |i|
      name = result.fields[i]
      columns[name.to_sym] = {:type=>@types[result.ftype(i).to_s], :name=>name.to_s, :index=>i}
    end


    ref_columns = EKYLIBRE[reflection].keys.collect{|k| k.to_sym}

    if @debug
      unfilled  = EKYLIBRE[reflection].collect{|k,v| v[:null] ? nil : k.to_sym}.compact-options[:select].keys-[:company_id]
      log "\033\[01;31m#{reflection.to_s.ljust(20,' ')} UNF***\033\[00m : "+colorize(unfilled) if unfilled.size>0
      unfilled2 = ref_columns-options[:select].keys-[:company_id]-unfilled
      log "#{reflection.to_s.ljust(20,' ')} UNFILL : "+colorize(unfilled2) if unfilled2.size>0 
      unused = all_columns.delete_if{|x| options[:select].detect{|y| y.to_s.match(/#{x.to_s}/i)}}
      log "#{reflection.to_s.ljust(20,' ')} UNUSED : "+colorize(unused) if unused.size>0 and (unfilled.size>0 or unfilled2.size>0)
      unwanted  = options[:select].keys-ref_columns 
      log "\033\[01;33m#{reflection.to_s.ljust(20,' ')} UNWANT\033\[00m : "+colorize(unwanted) if unwanted.size>0
    end
    
    send('rows_'+@mode.to_s, reflection, result, columns)    
  end
  
  
  def migrate(file, options={})
    array = file.split(/\./)
    code, ext, debug = nil, nil, nil
    if array.size == 1
      code = array[0]
    elsif array.size == 2
      code, ext = array[0], array[1]
    elsif array.size == 3
      code, debug, ext = array[0], array[1], array[2]
    else
      code, debug, ext = array[0..-3].join('.'), array[-2], array[-1]
    end
    code ||= 'SAC'
    @mode = (ext||:xml).to_sym
    @debug = (debug.to_s.size>0)


    log "Creating backup for #{code} in #{@mode}"+(@debug ? " (Mode debug)" : "")+"..."

    @start = Time.now.to_i
    @conn = PGconn.open(:dbname => 'brice', :user=>'brice', :password=>'calypso')

    @users = {}
    @conn.exec('SELECT em_login AS login, em_numero AS id FROM employe').each do |u|
      @users[u['login']] = u['id'].to_i
    end
    @types = {}
    @conn.exec('SELECT oid, typname from pg_type where typrelid=0 and typelem=0').each do |t|
      @types[t['oid']] = t['typname'].to_sym
    end

    @reflections = EKYLIBRE.keys

    @conn.exec("SELECT * FROM table_societe WHERE so_abbrev='#{code||'SAC'}'").each do |company|
      company_id = company['so_numero']
      company_code = company['so_abbrev']
      maximum_id = 999999999
      @file = File.open(file, 'wb')
      if @mode==:xml
        @file.write "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
        @file.write "<backup creator=\"Brice\" version=\"20090820202020\">\n"
        @file.write "  <company entity_id=\"#{maximum_id}\" name=\"#{company['so_libelle']}\">\n"
      elsif @mode==:sql
        @file.write "-- version: 20090731080018\n"
      end
      rows(:entities,       :select=>{:id=>maximum_id, :category_id=>1, :country=>"'fr'", :vat_submissive=>true, :full_name=>"COALESCE(so_detail, so_libelle, '#{company_id}')", :supplier=>false, :reflation_submissive=>true, :client=>false, :language_id=>1, :nature_id=>:np_numero, :active=>true, :_stamps=>'so', :name=>:so_libelle, :code=>:so_abbrev}, :from=>"table_societe so, table_naturepersonne np", :conditions=>"so_numero=#{company_id} AND np_morale", :limit=>1)
      rows(:establishments, :select=>{:id=>1, :name=>"'Établissement principal'", :siret=>"'00000000000000'", :nic=>"'00000'", :comment=>"'Par défaut'"})
      rows(:currencies,     :select=>{:id=>1, :name=>"'Euro'", :code=>"'EUR'", :rate=>1, :active=>true, :format=>true, :comment=>"'Par défaut'"})
      rows(:languages,      :select=>{:id=>1, :name=>"'French'", :native_name=>"'Français'", :iso2=>"'fr'", :iso3=>"'fra'"})
      rows(:units,          :select=>{:id=>1, :name=>"'u'",:quantity=>1, :label=>"'Unité'", :base=>"'u'"})
      rows(:delays,         :select=>{:id=>1, :name=>"'Délai 30 jours'", :expression=>"'30 jours'", :active=>true, :comment=>NULL})
      rows(:shelves,        :select=>{:id=>1, :name=>"'Défaut'", :catalog_name=>"'Général'", :catalog_description=>"'Tout'", :comment=>NULL, :parent_id=>NULL})
      rows(:address_norms,  :select=>{:id=>1, :name=>"'Norme AFNOR ZX110'", :default=>false, :align=>"'left'", :rtl=>false, :reference=>"''"})
      rows(:bank_accounts,  :select=>{:id=>1, :name=>"'Compte courant'", :entity_id=>maximum_id, :account_id=>maximum_id, :currency_id=>1, :iban=>"'FR76'", :iban_label=>"'FR76'", :deleted=>false, :mode=>"'iban'", :default=>true, :journal_id=>:jo_numero, :_stamps=>true}, :from=>"table_journal", :conditions=>"jo_libelle ilike 'b%' and so_numero=#{company_id}", :limit=>1)
      rows(:departments,    :select=>{:id=>:se_numero, :name=>:se_nom, :comment=>:se_code, :parent_id=>NULL}, :from=>"table_service", :conditions=>"se_societe=#{company_id}")
      rows(:journals,       :select=>{:id=>:jo_numero, :name=>:jo_libelle, :code=>:jo_abbrev, :counterpart_id=>:cg_numero, :deleted=>false, :currency_id=>1, :closed_on=>"CURRENT_DATE-'5 years'::INTERVAL", :nature=>"'various'"}, :from=>"table_journal", :conditions=>"so_numero=#{company_id}")
      rows(:accounts,       :select=>{:id=>maximum_id, :name=>"'Compte banque'", :is_debit=>false, :number=>"'51200001'", :usable=>true, :groupable=>true, :keep_entries=>true, :letterable=>true, :deleted=>false, :label=>"'51200001 - Compte banque'", :transferable=>false, :parent_id=>0, :pointable=>true, :alpha=>NULL, :comment=>NULL, :last_letter=>NULL})
      rows(:roles,          :select=>{:id=>:dp_numero, :name=>:dp_libelle, :rights=>"''"}, :from=>"droitprofil")
      rows(:users,          :select=>{:id=>:em_numero, :name=>:em_login, :admin=>:em_super, :last_name=>:ag_nom, :first_name=>:ag_prenom, :role_id=>:dp_numero, :email=>:ag_email, :language_id=>1, :locked=>false, :deleted=>false, :rights=>"''", :credits=>false, :free_price=>false,:reduction_percent=>5, :salt=>"'_Y§UV9TBiYTo<Oy[>ViBkcAWmJ08f.2R;-g}N{VqR%v§dfZV3e;AYBjVz}SpQLHe'", :hashed_password=>"'201d1d52be36ea80195dc7c00c3d723663cada50a9412987207543d143b1f00f'", :_stamps=>'em'}, :from=>"table_employe em join table_service on (em_service=se_numero) join agent ag on (em_agent=ag_numero)", :conditions=>"se_societe=#{company_id}")
      rows(:professions,    :select=>{:id=>:dp_numero, :name=>:dp_libelle, :commercial=>true, :rome=>NULL, :code=>"UPPER(TRIM(dp_libelle))"}, :from=>"droitprofil")
      rows(:employees,      :select=>{:id=>:em_numero, :department_id=>:em_service, :last_name=>:ag_nom, :first_name=>:ag_prenom, :comment=>:ag_commentaire, :role=>:ag_role, :profession_id=>:dp_numero, :arrived_on=>"'1946-01-01'::DATE", :departed_on=>NULL, :office=>NULL, :establishment_id=>1, :commercial=>true, :user_id=>:em_numero, :title=>"SUBSTR(em_emploi,1,32)", :_stamps=>'em'}, :from=>"table_employe em join table_service on (em_service=se_numero) join agent ag on (em_agent=ag_numero)", :conditions=>"se_societe=#{company_id}")
      rows(:entity_categories,  :select=>{:id=>1, :name=>"'Catégorie par défaut'", :code=>"'DEFAUT'", :default=>true, :deleted=>false, :description=>"'Catégorie utilisée pour tout le monde'"})
      rows(:accounts,           :select=>{:id=>maximum_id+1, :name=>"'Stocks et en-cours'", :deleted=>false, :label=>"'3 Stocks et en-cours'", :number=>3, :parent_id=>0, :usable=>true, :alpha=>NULL, :comment=>NULL, :last_letter=>NULL, :groupable=>false, :is_debit=>false, :keep_entries=>false, :letterable=>false, :pointable=>false, :transferable=>false})
      rows(:stock_locations,    :select=>{:id=>1, :name=>"'Entrepôt par défaut'",:account_id=>maximum_id+1, :establishment_id=>1, :parent_id=>0, :reservoir=>false, :number=>false})
      rows(:sale_order_natures, :select=>{:id=>1, :name=>"'Vente classique'", :expiration_id=>1, :downpayment=>true, :payment_delay_id=>1, :downpayment_rate=>0.3, :downpayment_minimum=>300, :active=>true, :payment_type=>"'check'", :comment=>NULL})
      rows(:entity_natures,     :select=>{:id=>:np_numero, :name=>:np_nom, :abbreviation=>:np_abrev, :title=>:np_titre, :in_name=>:np_inclu, :active=>true, :physical=>"NOT np_morale", :description=>NULL}, :from=>"table_naturepersonne")
      rows(:entities,       :select=>{:id=>:pe_numero, :name=>:pe_nom, :first_name=>:pe_prenom, :born_on=>:pe_naissance, :code=>:pe_id, :active=>:pe_actif, :nature_id=>:np_numero, :webpass=>:pe_motdepasse, :full_name=>:pe_libelle, :language_id=>1, :category_id=>1, :reduction_rate=>0, :discount_rate=>0, :vat_number=>"SUBSTR(REPLACE(pe_numtvaic,' ',''),1,15)", :client=>true, :supplier=>false, :country=>"'fr'", :vat_submissive=>true, :reflation_submissive=>true, :proposer_id=>NULL}, :from=>"personne ORDER BY pe_numero")
      rows(:accounts,       :select=>{:id=>:cg_numero, :name=>:cg_libelle, :number=>:cg_numcompte, :usable=>:cg_utilisable, :is_debit=>:cg_debit, :pointable=>:cg_pointable, :groupable=>:cg_groupable, :letterable=>:cg_lettrable, :alpha=>NULL, :comment=>NULL, :last_letter=>NULL, :keep_entries=>false, :deleted=>false, :label=>"cg_numcompte::TEXT||' '||cg_libelle", :transferable=>false, :parent_id=>0}, :from=>"table_comptegen", :conditions=>"so_numero=#{company_id}")
      rows(:districts,      :select=>{:id=>:ct_numero, :name=>:ct_nom, :code=>:ct_numero}, :from=>"table_canton")
      rows(:areas,          :select=>{:id=>"vc.id", :name=>"TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom))", :code=>NULL, :postcode=>:cp_codepostal, :city=>:vi_nom, :city_name=>"TRIM(split_part(vi_nom, 'CEDEX', 1))", :country=>"'fr'", :district_id=>:ct_numero, :_stamps=>'vc'}, :from=>"villecp vc JOIN ville USING (vi_numero) JOIN codepostal cp USING (cp_numero)")
      rows(:contacts, :distinct=>true, :select=>{:id=>:ad_numero, :norm_id=>1, :country=>"'fr'",:active=>true, :deleted=>false, :default=>:ad_default, :entity_id=>:pe_numero, :line_2=>:ad_ligne2, :line_3=>:ad_ligne3, :line_4_number=>"''", :line_4_street=>:ad_ligne4, :line_5=>:ad_ligne5, :line_6=>"TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom))", :address=>"TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom))", :area_id=>"vc.id", :phone=>"tel.cn_coordonnee", :fax=>"fax.cn_coordonnee", :mobile=>"port.cn_coordonnee", :email=>"mail.cn_coordonnee", :website=>"www.cn_coordonnee", :_stamps=>'ad'}, :from=>"table_adresse AS ad LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact where ck_numero=104) AS mail using (pe_numero)  LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact where ck_numero=105) AS fax using (pe_numero) LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact where ck_numero=106) AS port using (pe_numero) LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact where ck_numero=107) AS tel using (pe_numero) LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact where ck_numero=108) AS www using (pe_numero) LEFT JOIN table_villecp vc ON (vc.vi_numero=ad.vi_numero AND vc.cp_numero=ad.cp_numero) LEFT JOIN table_ville vi on (vc.vi_numero=vi.vi_numero) LEFT JOIN table_codepostal cp on (vc.cp_numero=cp.cp_numero)", :conditions=>"ad_active ORDER BY pe_numero")
      rows(:entity_link_natures, :select=>{:id=>:tl_numero, :name=>:tl_libelle, :name_1_to_2=>:tl_action12, :name_2_to_1=>:tl_action21, :comment=>:tl_description, :symmetric=>"LENGTH(TRIM(tl_action21))<=0", :propagate_contacts=>"tl_code='>GERE>'"}, :from=>"table_typelien")
      rows(:entity_links, :select=>{:id=>:el_numero, :entity1_id=>:el_personne1, :entity2_id=>:el_personne2, :nature_id=>:tl_numero, :started_on=>:el_debut, :stopped_on=>:el_fin, :comment=>:tl_code}, :from=>"table_estlie")
      rows(:observations, :select=>{:id=>:ob_numero, :entity_id=>:pe_numero, :description=>:ob_observation, :importance=>"'normal'"}, :from=>"table_observation ORDER BY pe_numero")
      rows(:mandates,     :select=>{:id=>:peac_numero, :entity_id=>:pe_numero, :started_on=>:peac_periodedebut, :stopped_on=>:peac_periodefin, :family=>:re_famille, :title=>:peac_titre, :organization=>:re_nom, :_stamps=>'e'}, :from=>"estresponsable e join responsabilite r USING (re_numero) ORDER BY pe_numero")
      rows(:complements,  :select=>{:id=>:ta_numero, :name=>:ta_nom, :required=>false, :active=>true, :nature=>"'choice'", :length_max=>NULL, :decimal_max=>NULL, :decimal_min=>NULL, :position=>NULL}, :from=>"table_typeattribut")
      rows(:complement_choices, :select=>{:id=>:cr_numero, :name=>:cr_libelle, :value=>:cr_description, :complement_id=>:ta_numero, :position=>0}, :from=>"table_categorie")
      rows(:complement_data, :distinct=>[:pe_numero, :ta_numero], :select=>{:id=>:at_numero, :entity_id=>:pe_numero, :complement_id=>:ta_numero, :string_value=>:at_valeur, :choice_value_id=>:cr_numero, :date_value=>NULL, :datetime_value=>NULL, :decimal_value=>NULL, :boolean_value=>NULL}, :from=>"table_attribut")
      rows(:event_natures, :select=>{:id=>:th_numero, :name=>:th_libelle, :usage=>"'manual'", :duration=>10}, :from=>"table_typetache")
      rows(:events,       :select=>{:id=>:ap_numero, :entity_id=>:pe_numero, :duration=>:ap_duree, :nature_id=>:th_numero, :reason=>"TRIM(COALESCE(ap_libelle||CASE WHEN ap_description IS NULL THEN '' ELSE ' ('||ap_description||')' END, ap_description))", :employee_id=>"COALESCE(em_numero,500000076)", :started_at=>"COALESCE(ap_date, ap.created_at)", :started_sec=>0, :location=>"'Lieu de travail'", :_stamps=>'ap'}, :from=>"table_appel ap LEFT JOIN table_employe on (em_login=ap.updated_by)", :conditions=>"em_service IN (SELECT se_numero FROM table_service WHERE se_societe=#{company_id}) ORDER BY pe_numero")
      rows(:sequences,    :select=>{:id=>:sq_numero, :name=>:sq_nom, :last_number=>:sq_last, :format=>"'F[number|10]'", :number_increment=>1, :number_start=>1, :period=>"'number'", :last_year=>"EXTRACT(YEAR FROM CURRENT_DATE)", :last_month=>"EXTRACT(MONTH FROM CURRENT_DATE)", :last_cweek=>"EXTRACT(WEEK FROM CURRENT_DATE)", :_stamps=>'sq'}, :from=>"table_societe join sequence sq using (sq_numero)", :conditions=>"so_numero=#{company_id}")
      rows(:parameters,   :select=>{:id=>1, :name=>"'management.invoicing.numeration'", :record_value_id=>:sq_numero, :record_value_type=>"'Sequence'", :nature=>"'record'", :user_id=>NULL, :boolean_value=>NULL, :decimal_value=>NULL, :integer_value=>NULL, :string_value=>NULL, :_stamps=>'sq'}, :from=>"table_societe JOIN sequence sq using (sq_numero)", :conditions=>"so_numero=#{company_id}")

      subscription_nature = 0
      if company_code == 'SAC'
        products = {'1'=>[500000095,500000164,500000183,500000163,500000123], '2'=>[500000036,500000065,500000069], '3'=>[500000002,500000003], '4'=>[100051]}
        rows(:subscription_natures, :select=>{:id=>1, :name=>"'Adhésion Adhérent FDSEA'",      :nature=>"'period'", :actual_number=>NULL, :comment=>"'Adhésion de droit pour les adhérents FDSEA (15% de réduction)'"})
        rows(:subscription_natures, :select=>{:id=>2, :name=>"'Abonnement Conseil Juridique'", :nature=>"'period'", :actual_number=>NULL, :comment=>"'Abonnement Conseil (25% de réduction)'"})
        rows(:subscription_natures, :select=>{:id=>3, :name=>"'Abonnement MAJ Convention Collective'", :nature=>"'period'", :actual_number=>NULL, :comment=>"'Abon. MAJCC'"})
        rows(:subscription_natures, :select=>{:id=>4, :name=>"'Adhésion Non-Adhérent FDSEA'",  :nature=>"'period'", :actual_number=>NULL, :comment=>"'Adhésion pour les non-adhérents FDSEA (0% de reduction)'"})
        
        for k,v in products
          rows(:subscriptions, :select=>{:id=>:lf_numero, :product_id=>:pd_numero, :entity_id=>"fa.pe_numero", :invoice_id=>:fa_numero, :comment=>:lf_notes, :sale_order_id=>:de_numero, :contact_id=>:ad_numero, :nature_id=>k, :first_number=>NULL, :suspended=>false, :last_number=>false, :quantity=>1, :started_on=>"(EXTRACT(YEAR FROM fa_date)::TEXT||'-01-01')::DATE", :stopped_on=>"(EXTRACT(YEAR FROM fa_date)::TEXT||'-12-31')::DATE", :_stamps=>'lf'}, :from=>"table_lignefacture lf JOIN table_facture fa using (fa_numero) LEFT JOIN (SELECT fa_numero AS avoir FROM table_facture WHERE fa_avoir) av ON (fa_avoir_facture=avoir) where avoir is null and pd_numero in (#{v.join(',')}) ORDER BY fa.pe_numero")
        end
      elsif company_code == 'FDS'
        products = {'1'=>[300017,300006,500000172,500000052,500000150,500000053,500000162,500000124,500000054]}
        rows(:subscription_natures, :select=>{:id=>1, :name=>"'Adhésion FDSEA'", :nature=>"'period'", :actual_number=>NULL, :comment=>"'Adhésion à la FDSEA (la seule et unique)'"})
        rows(:subscriptions, :select=>{:id=>:cs_numero, :entity_id=>:pe_numero, :comment=>"E'{cotisation.numero:'||cs_numero::TEXT||E'}\n'||COALESCE(cs_detail,'')", :suspended=>false, :first_number=>NULL, :last_number=>NULL, :quantity=>1, :product_id=>"bml_extract(cs_detail, 'fdsea.forfait.produit')", :invoice_id=>"bml_extract(cs_detail, 'fdsea.facture')", :nature_id=>1, :started_on=>"(cs_annee::TEXT||'-01-01')::DATE", :stopped_on=>"(cs_annee::TEXT||'-12-31')::DATE"}, :from=>"table_cotisation ORDER BY pe_numero")
        # rows(:subscriptions, :select=>{"1"=>:nature_id, NULL"=>:first_number, false"=>:suspended, NULL"=>:last_number, 1"=>:quantity, (EXTRACT(YEAR"}, :from=>"fa_date)::TEXT||'-01-01')::DATE"=>:started_on, (EXTRACT(YEAR"}, :from=>"fa_date)::TEXT||'-12-31')::DATE"=>:stopped_on,lf.* from table_lignefacture lf JOIN table_facture using (fa_numero) LEFT JOIN (SELECT fa_numero"=>:avoir"}, :from=>"table_facture", :conditions=>"fa_avoir) av ON (fa_avoir_facture=avoir) where avoir is null and pd_numero in (300017,300006,500000172,500000052,500000150,500000053,500000162,500000124,500000054)", 'pd_numero'=>'product_id')
      elsif company_code == 'AAV'
        products = {'1'=>[1400002,1400006,500000094,500000096,500000098,500000099,500000100,500000109,500000125]}
        rows(:subscription_natures, :select=>{:id=>1, :name=>"'L''Avenir Agricole & Viticole Aquitain'", :nature=>"'quantity'", :actual_number=>:cs_valeur, :comment=>NULL}, :from=>"table_constante", :conditions=>"cs_nom='CURRENT_NUMBER'")
        rows(:subscriptions,        :select=>{:id=>:ro_numero, :first_number=>:ro_debutservice, :last_number=>:ro_finservice, :contact_id=>"ro.ad_numero", :suspended=>:ro_suspendu, :quantity=>:ro_quantite, :invoice_id=>:fa_numero, :entity_id=>"ro.pe_numero", :nature_id=>1, :started_on=>NULL, :stopped_on=>NULL, :sale_order_id=>:de_numero, :product_id=>:pd_numero, :comment=>NULL, :_stamps=>'ro'}, :from=>"table_routage ro LEFT JOIN table_facture using (fa_numero) LEFT JOIN table_lignefacture using (fa_numero) ORDER BY ro.pe_numero")
      end

      subscription_nature = "CASE "+products.collect{|k,v| "WHEN pd.pd_numero IN (#{v.join(',')}) THEN #{k}"}.join(" ")+" ELSE NULL END"
      product_nature = "CASE "+products.collect{|k,v| "WHEN pd.pd_numero IN (#{v.join(',')}) THEN 'subscrip'"}.join(" ")+" ELSE 'service' END"

      rows(:products,    :select=>{:id=>"pd.pd_numero", :name=>"CASE WHEN pd_actif THEN pd_libelle ELSE pd_libelle||' ('||pd_id||')' END", :comment=>"pd.pd_numero", :catalog_name=>:pd_titre, :active=>:pd_actif, :code=>:pd_id, :reduction_submissive=>:pd_reduction, :unquantifiable=>:pd_sansquantite, :number=>:pd_id, :subscription_nature_id=>subscription_nature, :unit_id=>1, :shelf_id=>1, :nature=>product_nature, :manage_stocks=>false, :to_sale=>true, :to_purchase=>false, :to_rent=>false, :supply_method=>"'buy'", :critic_quantity_min=>1, :quantity_min=>5, :product_account_id=>"ci.cg_numero", :weight=>0, :_stamps=>'pd'}, :from=>"table_produit pd LEFT JOIN table_compteproduit ci ON (pd.pd_numero=ci.pd_numero AND ci_actif)", :conditions=>"so_numero=#{company_id} ORDER BY pd_libelle")
      rows(:taxes,       :select=>{:id=>:tv_numero, :amount=>:tv_taux, :name=>:tv_code, :account_collected_id=>:cg_numero, :deleted=>"NOT tv_actif", :reductible=>true, :included=>false, :nature=>"'percent'", :description=>NULL, :account_paid_id=>NULL}, :from=>"table_tva", :conditions=>"so_numero=#{company_id}")
      rows(:prices,      :select=>{:id=>:px_numero, :product_id=>:pd_numero, :amount=>:px_tarifht, :amount_with_taxes=>:px_tarifttc, :tax_id=>:tv_numero, :active=>:px_actif, :started_at=>:px_datedebut, :stopped_at=>:px_datefin, :entity_id=>maximum_id, :category_id=>1, :default=>:px_actif, :currency_id=>1, :use_range=>false, :quantity_min=>0, :quantity_max=>0, :_stamps=>'px'}, :from=>"table_prix px join table_produit using (pd_numero)", :conditions=>"so_numero=#{company_id}")
      rows(:sale_orders, :select=>{:id=>:de_numero, :comment=>:de_libelle, :client_id=>:pe_numero, :introduction=>:de_introduction, :function_title=>:de_civilites, :created_on=>:de_date, :invoiced=>:de_locked, :letter_format=>:de_lettre, :responsible_id=>:em_numero, :contact_id=>:ad_numero, :expiration_id=>1, :state=>"'P'", :amount=>"COALESCE(de_montantht,0)", :amount_with_taxes=>"COALESCE(de_montantttc,0)", :number=>:de_numero, :has_downpayment=>"COALESCE(de_acompte, false)", :payment_delay_id=>1, :nature_id=>1, :sum_method=>"'wt'", :expired_on=>"de_date+'1 month'::INTERVAL", :invoice_contact_id=>:ad_numero, :delivery_contact_id=>:ad_numero, :downpayment_amount=>"ROUND(0.3*COALESCE(de_montantttc,0), 2)"}, :from=>"table_devis", :conditions=>"so_numero=#{company_id} ORDER BY pe_numero")
      rows(:sale_order_lines, :select=>{:id=>:l_numero, :order_id=>:de_numero, :product_id=>"l.pd_numero", :price_id=>:px_numero, :quantity=>:l_quantite, :amount=>:l_montantht, :amount_with_taxes=>:l_montantttc, :annotation=>:l_notes, :entity_id=>"l.pe_numero", :position=>0, :location_id=>1, :unit_id=>1, :account_id=>"COALESCE(cg_numero, 0)", :invoiced=>:de_locked, :_stamps=>'l'}, :from=>"table_ligne l JOIN table_devis de USING (de_numero) LEFT JOIN table_compteproduit ci on (l.pd_numero=ci.pd_numero AND ci_actif)", :conditions=>"so_numero=#{company_id} ORDER BY de.pe_numero")
      rows(:invoices, :select=>{:id=>:fa_numero, :sale_order_id=>:de_numero, :client_id=>:pe_numero, :number=>:fa_numfact, :created_on=>:fa_date, :origin_id=>:fa_avoir_facture, :lost=>:fa_perte, :contact_id=>:ad_numero, :credit=>:fa_avoir, :annotation=>:fa_annotation, :amount=>"COALESCE(fa.fa_montantht,0)", :amount_with_taxes=>"COALESCE(fa.fa_montantttc,0)", :nature=>"CASE WHEN COALESCE(fa.fa_montantttc,0)>0 THEN 'S' ELSE 'C' END", :payment_delay_id=>1, :payment_on=>"fa_date+'1 month'::INTERVAL", :paid=>"COALESCE(fa_ok, false)", :has_downpayment=>"COALESCE(fa.fa_accompte,0)>0", :downpayment_amount=>"COALESCE(fa_accompte,0)", :_stamps=>'fa'}, :from=>"table_facture fa LEFT JOIN vue_facture_regle using(fa_numero)", :conditions=>"fa.so_numero=#{company_id} ORDER BY pe_numero")
      rows(:invoice_lines, :select=>{:id=>:lf_numero, :invoice_id=>:fa_numero, :product_id=>"COALESCE(lf.pd_numero,0)", :price_id=>"COALESCE(lf.px_numero,0)", :quantity=>:lf_quantite, :annotation=>:lf_notes, :entity_id=>"lf.pe_numero", :position=>0, :order_line_id=>"l_numero", :amount=>"COALESCE(lf_montantht,0)", :amount_with_taxes=>"COALESCE(lf_montantttc)", :_stamps=>'lf'}, :from=>"table_lignefacture lf join table_facture fa using (fa_numero) LEFT JOIN table_ligne ld ON (ld.pd_numero=lf.pd_numero AND fa.de_numero=ld.de_numero)", :conditions=>"so_numero=#{company_id} ORDER BY fa.pe_numero")
      rows(:embankments, :select=>{:id=>:lr_numero, :amount=>:lr_montant, :created_on=>:lr_date, :mode_id=>:mr_numero, :comment=>:lr_commentaire, :embanker_id=>:em_numero, :locked=>true, :bank_account_id=>1, :payments_count=>:pcount}, :from=>"table_listereglement JOIN (SELECT lr_numero, count(rg_numero) AS pcount from table_reglement group by 1) AS c USING (lr_numero)", :conditions=>"so_numero=#{company_id}")
      rows(:payments, :select=>{:id=>:rg_numero, :entity_id=>:pe_numero, :check_number=>:rg_reference, :amount=>:rg_montant, :mode_id=>:mr_numero, :account_number=>:rg_numerocompte, :bank=>:rg_libellebanque, :embankment_id=>:lr_numero, :embanker_id=>:em_numero, :paid_on=>:rg_date, :to_bank_on=>"COALESCE(rg.created_at::DATE, rg_date, '0001-01-01'::DATE)", :received=>true, :scheduled=>false, :parts_amount=>:pamount}, :from=>"table_reglement rg LEFT JOIN (SELECT table_facturereglement.rg_numero, sum(table_facturereglement.fr_montant) AS pamount FROM table_facturereglement GROUP BY table_facturereglement.rg_numero) pa USING (rg_numero)", :conditions=>"so_numero=#{company_id} ORDER BY pe_numero")
      rows(:payment_parts, :select=>{:id=>:fr_numero, :payment_id=>:rg_numero, :amount=>:fr_montant, :downpayment=>:fr_acompte, :invoice_id=>:fa_numero, :order_id=>"COALESCE(de_numero,0)", :_stamps=>"fr"}, :from=>"table_facturereglement fr join table_reglement rg using (rg_numero) join table_facture using (fa_numero)", :conditions=>"rg.so_numero=#{company_id}")
      rows(:payment_modes, :select=>{:id=>:mr_numero, :name=>:mr_libelle, :account_id=>:cg_numero, :bank_account_id=>1, :mode=>"CASE WHEN mr_cheque THEN 'check' ELSE 'other' END", :nature=>"'U'"}, :from=>"table_modereglement", :conditions=>"so_numero=#{company_id}")
      if @mode==:xml
        @file.write "  </company>\n"
        @file.write "</backup>"
      end
      @file.close
      

    end
    log "#{@reflections.size} unfilled ekylibre models: "+@reflections.collect{|x| x.to_s}.sort.join(", ")+"."
    log (Time.now.to_i-@start).to_s+" seconds"
  end

end


if ARGV.size>0
  Migrator.new.migrate(ARGV[0])
else
  puts "Usage: gst2eky file[.debug].ext"
end

