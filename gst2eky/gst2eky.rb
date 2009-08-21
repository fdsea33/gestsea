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

class Migrator


  def colorize(array)
    array.sort.collect do |x|
      if x.to_s.match(/_id$/)
        "\033\[01;32m#{x}\033\[00m"
      elsif x.to_s.match(/_numero$/)
        "\033\[01;34m#{x}\033\[00m"
      else
        x
      end
    end.join(", ")
  end

  def stamps(exists=false)
    if exists.is_a? FalseClass
      ', CURRENT_TIMESTAMP AS created_at, CURRENT_TIMESTAMP AS updated_at, NULL AS created_by, NULL AS updated_by, 0 AS lock_version '
    else
      prefix = ''
      prefix = exists+'.' if exists.is_a? String
      ", #{prefix}created_at, #{prefix}updated_at, #{prefix}created_by, #{prefix}updated_by, #{prefix}lock_version "
    end
  end
  













  def rows_xml(reflection, result, columns)
    # puts columns.inspect
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
    puts "  count: "+count.to_s unless @debug
    code = ''
    if count>3000
      part = (count/10).to_i
      for x in 0..9
        code += "for i in #{x*part}..#{(x==9 ? count : (x+1)*part)-1}\n"
        code += "  @file.write(\"      <row "+values+"/>\\n\"\n)"
        code += "end\n"
        code += "puts '.'\n" unless @debug
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
    puts "  count: "+count.to_s unless @debug
    code = ''
    if count>3000
      part = (count/10).to_i
      for x in 0..9
        code += "for i in #{x*part}..#{(x==9 ? count : (x+1)*part)-1}\n"
        code += "  @file.write("+values+"+\"\\n\")\n"
        code += "end\n"
        code += "puts '.'\n" unless @debug
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




  def rows(reflection, query, conversion={})
    default_conversion = {'updated_at'=>'updated_at', 'created_at'=>'created_at', 'updated_by'=>'updater_id', 'created_by'=>'creator_id', 'lock_version'=>'lock_version'} #, 'so_numero'=>:none}
    conversion = default_conversion.merge(conversion)
    puts(reflection.to_s) unless @debug
    raise Exception.new(reflection.inspect) if EKYLIBRE[reflection].nil?

    @reflections.delete reflection

    query.gsub!(/@@@/, (@debug ? ' LIMIT 30 ' : ''))
    result = @conn.exec(query) 
    
    conversion['thekey'] = 'id' if result.fields.include? 'thekey'
    conversion['id'] = :none if result.fields.include? 'id'
    
    columns = EKYLIBRE[reflection].keys
    # Automatic conversions
    for column in columns
      conversion[column] = column if conversion[column].nil? and result.fields.include?(column)# and default_conversion[column].nil?
    end
    unused = []
    columns = {}
    result.fields.size.times do |i|
      name = result.fields[i]
      if conversion[name].nil?
        unused << name unless default_conversion.keys.include? name
      elsif conversion[name] == 'thekey'
        columns[name] = {:type=>@types[result.ftype(i).to_s], :name=>'id', :index=>i}
      elsif conversion[name] != :none
        columns[name] = {:type=>@types[result.ftype(i).to_s], :name=>conversion[name], :index=>i}
      end
    end
    
    forgotten = []
    for k, v in conversion
      forgotten << k unless result.fields.include? k.to_s
    end
    
    if @debug
      unfilled = EKYLIBRE[reflection].collect{|k,v| v[:null] ? nil : k}.compact-conversion.values-default_conversion.values-["company_id", "id"]
      puts "\033\[01;31m#{reflection.to_s.rjust(20,' ')} UNF***\033\[00m : "+colorize(unfilled) if unfilled.size>0
      unfilled2 = EKYLIBRE[reflection].keys-conversion.values-default_conversion.values-["company_id", "id"]-unfilled
      puts "#{reflection.to_s.rjust(20,' ')} UNFILL : "+colorize(unfilled2) if unfilled2.size>0 
      puts "#{reflection.to_s.rjust(20,' ')} UNUSED : "+colorize(unused) if unused.size>0 and (unfilled2.size>0 or unfilled.size>0)
      unvalid = columns.collect{|k,v| EKYLIBRE[reflection].keys.include?(v[:name].to_s) ? nil : v[:name]}.compact
      puts "\033\[01;33m#{reflection.to_s.rjust(20,' ')} UNWANT\033\[00m : "+colorize(unvalid) if unvalid.size>0
      puts "\033\[01;35m#{reflection.to_s.rjust(20,' ')} FORGOT\033\[00m : "+colorize(forgotten) if forgotten.size>0
    end
    
    # puts reflection.to_s.rjust(20,' ')+"\n"+columns.collect{|k,v| (k.to_s.ljust(20,' ')+' AS '+v[:name].to_s) if v[:name]=='id'}.compact.join("\n")

    send('rows_'+@mode.to_s, reflection, result, columns)    
  end
  
  
  def migrate(abbrev='SAC', mode=:xml, debug=false)
    @mode = mode
    @debug = debug
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

    @conn.exec("SELECT * FROM table_societe WHERE so_abbrev='#{abbrev||'SAC'}'").each do |company|
      company_id = company['so_numero']
      company_code = company['so_abbrev']
      maximum_id = 999999999
      @file = File.open(company_code.to_s+'.xml', 'wb')
      if @mode==:xml
        @file.write "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
        @file.write "<backup creator=\"Brice\" version=\"20090819191919\">\n"
        @file.write "  <company entity_id=\"#{maximum_id}\" name=\"#{company['so_libelle']}\">\n"
      elsif @mode==:sql
        @file.write "-- version: 20090731080018\n"
      end
      rows(:entities,       "SELECT #{maximum_id} AS thekey, so.*, 1 AS category_id, 'fr' AS country, true AS vat_submissive, COALESCE(so_detail, so_libelle, '#{company_id}') AS full_name, false AS supplier, true AS reflation_submissive, false AS client, 1 AS language_id, np_numero AS nature_id, true AS active #{stamps('so')} FROM table_societe so, table_naturepersonne np WHERE so_numero=#{company_id} AND np_morale LIMIT 1", 'so_libelle'=>'name', 'so_abbrev'=>'code')
      rows(:establishments, "SELECT 1 AS thekey, 'Établissement principal' AS name, '00000000000000' AS siret, '00000' AS nic, 'AG' AS comment #{stamps}")
      rows(:currencies,     "SELECT 1 AS thekey, 'Euro' AS name, 'EUR' AS code, 1 AS rate, true AS active, '%f €' AS format, '' AS comment #{stamps}")
      rows(:languages,      "SELECT 1 AS thekey, 'Français' AS native_name, 'French' AS name, 'fr' AS iso2, 'fra' AS iso3 #{stamps}")
      rows(:units,          "SELECT 1 AS thekey, 'u' AS name, 1 AS quantity, 'Unité' AS label, 'u' AS base #{stamps}")
      rows(:delays,         "SELECT 1 AS thekey, 'Délai 30 jours' AS name, '30 jours' AS expression, true AS active, NULL AS comment #{stamps}")
      rows(:shelves,        "SELECT 1 AS thekey, 'Défaut' AS name, 'Général' AS catalog_name, 'Tout' AS catalog_description, NULL AS comment, NULL AS parent_id #{stamps}")
      rows(:address_norms,  "SELECT 1 AS thekey, 'Norme AFNOR ZX110' AS name, false AS default, 'left' AS align, false AS rtl, '' AS reference #{stamps}")
      rows(:bank_accounts,  "SELECT 1 AS thekey, #{maximum_id} AS entity_id, #{maximum_id} AS account_id, 'Compte courant' AS name, 1 AS currency_id, 'FR76' AS iban, 'FR76' AS iban_label, false AS deleted, 'iban' AS mode, true AS default, jo_numero AS journal_id #{stamps(true)} FROM table_journal WHERE jo_libelle ilike 'b%' and so_numero=#{company_id} LIMIT 1")
      rows(:departments, "SELECT *, NULL AS parent_id FROM table_service WHERE se_societe=#{company_id} @@@", {'se_numero'=>'thekey', 'se_nom'=>'name', 'se_code'=>'comment'})
      rows(:journals, "SELECT *, false AS deleted, 1 AS currency_id, CURRENT_DATE-'5 years'::INTERVAL AS closed_on, 'various' AS nature from table_journal WHERE so_numero=#{company_id} @@@", {'jo_numero'=>'thekey', 'jo_libelle'=>'name', 'jo_abbrev'=>'code', 'cg_numero'=>'counterpart_id'})
      rows(:accounts, "SELECT #{maximum_id} AS thekey, 'Compte banque' AS name, false AS is_debit, '51200001' AS number, true AS usable, true AS groupable, true AS keep_entries, true AS letterable, false AS deleted, '51200001 - Compte banque' AS label, false AS transferable, 0 AS parent_id, true AS pointable, NULL AS alpha, NULL AS comment, NULL AS last_letter #{stamps}")
      rows(:roles, "SELECT *, '' AS rights FROM droitprofil", {'dp_numero'=>'thekey', 'dp_libelle'=>'name'})      
      rows(:users, "SELECT em.*, ag.*, 1 AS language_id, false AS locked, false AS deleted, '' AS rights, false AS credits, false AS free_price, 5 AS reduction_percent, '_Y§UV9TBiYTo<Oy[>ViBkcAWmJ08f.2R;-g}N{VqR%v§dfZV3e;AYBjVz}SpQLHe' AS salt, '201d1d52be36ea80195dc7c00c3d723663cada50a9412987207543d143b1f00f' AS hashed_password FROM table_employe em join table_service on (em_service=se_numero) join agent ag on (em_agent=ag_numero) WHERE se_societe=#{company_id} @@@", {'em_numero'=>'thekey', 'em_login'=>'name', 'em_super'=>'admin', 'ag_nom'=>'last_name', 'ag_prenom'=>'first_name', 'dp_numero'=>'role_id', 'ag_email'=>'email'})
      rows(:professions, "SELECT *, true AS commercial, NULL as rome, UPPER(TRIM(dp_libelle)) AS code FROM droitprofil", {'dp_numero'=>'thekey', 'dp_libelle'=>'name'})
      rows(:employees, "SELECT em.*, ag.*, '1946-01-01' AS arrived_on,  NULL AS departed_on, NULL AS office, 1 AS establishment_id, true AS commercial, em.em_numero AS user_id FROM table_employe em join table_service on (em_service=se_numero) join agent ag on (em_agent=ag_numero) WHERE se_societe=#{company_id} @@@", {'em_numero'=>'thekey', 'em_service'=>'department_id', 'ag_nom'=>'last_name', 'ag_prenom'=>'first_name', 'em_emploi'=>'title', 'ag_commentaire'=>'comment', 'ag_role'=>'role', 'dp_numero'=>'profession_id'})
      rows(:entity_categories, "SELECT 1 AS thekey, 'Catégorie par défaut' AS name, true AS \"default\", false AS deleted, 'DEFAUT' AS code, 'Catégorie utilisée pour tout le monde' AS description #{stamps}")
      rows(:accounts, "SELECT #{maximum_id+1} AS thekey, false AS  deleted, false AS groupable, false AS is_debit, false AS keep_entries, '3 Stocks et en-cours' AS label, false AS letterable, 'Stocks et en-cours' AS name, 3 AS number, 0 AS parent_id, false AS pointable, false AS transferable, true AS usable, NULL AS alpha, NULL AS comment, NULL AS last_letter #{stamps}")
      rows(:stock_locations,    "SELECT 1 AS thekey, 'Entrepôt par défaut' AS name, #{maximum_id+1} AS account_id, 1 AS establishment_id, 0 AS parent_id, false AS reservoir, 1 AS number #{stamps}")
      rows(:sale_order_natures, "SELECT 1 AS thekey, 'Vente classique' AS name, 1 AS expiration_id, true AS downpayment, 1 AS payment_delay_id, 0.3 AS downpayment_rate, 300 AS downpayment_minimum, true AS active, 'check' AS payment_type, NULL AS comment #{stamps}")

      rows(:entity_natures, "SELECT *, true AS active, not np_morale AS physical, NULL AS description FROM table_naturepersonne @@@", {'np_numero'=>'thekey', 'np_nom'=>'name', 'np_abrev'=>'abbreviation', 'np_titre'=>'title', 'physical'=>'physical', 'np_inclu'=>'in_name', 'active'=>'active'})
      rows(:entities, "SELECT *, 1 AS language_id, 1 AS category_id, 0 AS reduction_rate, 0 AS discount_rate, SUBSTR(REPLACE(pe_numtvaic,' ',''),1,15) AS vat_number, true AS client, false AS supplier, 'fr' AS country, true AS vat_submissive, true AS reflation_submissive, pe_libelle AS full_name, NULL AS proposer_id FROM personne ORDER BY pe_numero @@@", {'pe_numero'=>'thekey', 'pe_nom'=>'name', 'pe_prenom'=>'first_name', 'pe_naissance'=>'born_on', 'pe_id'=>'code', 'pe_actif'=>'active', 'np_numero'=>'nature_id', 'pe_motdepasse'=>'webpass'})
      rows(:accounts, "SELECT *, NULL AS alpha, NULL AS last_letter, NULL AS comment, false AS keep_entries, false AS deleted, cg_numcompte::TEXT||' '||cg_libelle AS label, false AS transferable, 0 AS parent_id FROM table_comptegen WHERE so_numero=#{company_id} @@@", {'cg_libelle'=>'name', 'cg_numero'=>'thekey', 'cg_numcompte'=>'number', 'cg_utilisable'=>'usable', 'cg_debit'=>'is_debit', 'cg_pointable'=>'pointable', 'cg_groupable'=>'groupable', 'cg_lettrable'=>'letterable'})
      rows(:districts, "SELECT *, ct_numero AS code FROM table_canton @@@", {'ct_numero'=>'thekey', 'ct_nom'=>'name'})
      rows(:areas, "SELECT NULL AS code, vc.id, cp_codepostal AS postcode, vi_nom AS city, TRIM(split_part(vi_nom, 'CEDEX', 1)) AS city_name, 'fr' AS country, TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom)) AS name, ct_numero AS district_id #{stamps('vc')} from villecp vc join ville using (vi_numero) join codepostal cp using (cp_numero) @@@")
      rows(:contacts, "SELECT distinct 1 AS norm_id, 'fr' AS country, true AS active, false AS deleted, ad_default AS \"default\", pe_numero AS entity_id, ad_numero AS thekey, ad_ligne2 AS line_2, ad_ligne3 AS line_3, '' AS line_4_number, ad_ligne4 AS line_4_street, ad_ligne5 AS line_5, TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom)) AS line_6, TRIM(COALESCE(cp_codepostal,'')||' '||COALESCE(vi_nom)) AS address ,  vc.id AS area_id, tel.cn_coordonnee AS phone, fax.cn_coordonnee AS fax, port.cn_coordonnee AS mobile, mail.cn_coordonnee AS email, www.cn_coordonnee AS website #{stamps('ad')} from table_adresse as ad left join (select * FROM table_contact where ck_numero=104) as mail using (pe_numero)  left join (select * FROM table_contact where ck_numero=105) as fax using (pe_numero) left join (select * FROM table_contact where ck_numero=106) as port using (pe_numero) left join (select * FROM table_contact where ck_numero=107) as tel using (pe_numero) left join (select * FROM table_contact where ck_numero=108) as www using (pe_numero) LEFT JOIN table_villecp vc ON (vc.vi_numero=ad.vi_numero AND vc.cp_numero=ad.cp_numero) left join table_ville vi on (vc.vi_numero=vi.vi_numero) left join table_codepostal cp on (vc.cp_numero=cp.cp_numero) where ad_active ORDER BY pe_numero @@@")
      rows(:entity_link_natures, "SELECT *, LENGTH(TRIM(tl_action21))<=0 AS symetrique, tl_code='>GERE>' AS propage FROM table_typelien @@@", {'tl_numero'=>'thekey', 'tl_libelle'=>'name', 'tl_action12'=>'name_1_to_2', 'tl_action21'=>'name_2_to_1', 'symetrique'=>'symmetric', 'propage'=>'propagate_contacts', 'tl_description'=>'comment'})
      rows(:entity_links, "SELECT * FROM table_estlie @@@", {'el_numero'=>'thekey', 'el_personne1'=>'entity1_id', 'el_personne2'=>'entity2_id', 'tl_numero'=>'nature_id', 'el_debut'=>'started_on', 'el_fin'=>'stopped_on', 'tl_code'=>'comment'})
      rows(:observations, "SELECT *, 'normal' AS importance FROM table_observation ORDER BY pe_numero @@@", {'ob_numero'=>'thekey', 'pe_numero'=>'entity_id', 'ob_observation'=>'description', 'importance'=>'importance'})
      rows(:mandates, "SELECT r.re_famille, r.re_nom, e.* from estresponsable e join responsabilite r USING (re_numero) ORDER BY pe_numero @@@", {'peac_numero'=>'thekey', 'pe_numero'=>'entity_id', 'peac_periodedebut'=>'started_on', 'peac_periodefin'=>'stopped_on', 're_famille'=>'family', 'peac_titre'=>'title', 're_nom'=>'organization'})
      rows(:complements, "SELECT *, false as required, true as active, 'choice' AS nature, NULL AS length_max, NULL AS decimal_max, NULL AS decimal_min, NULL AS position FROM table_typeattribut @@@", {'ta_numero'=>'thekey', 'ta_nom'=>'name'})
      rows(:complement_choices, "SELECT *, 0 AS position FROM table_categorie @@@", {'cr_numero'=>'thekey', 'cr_libelle'=>'name', 'cr_description'=>'value', 'ta_numero'=>'complement_id'})
      rows(:complement_data, "SELECT DISTINCT ON (pe_numero, ta_numero) *, NULL AS date_value, NULL AS datetime_value, NULL AS decimal_value, NULL AS boolean_value FROM table_attribut @@@", {'at_numero'=>'thekey', 'pe_numero'=>'entity_id', 'ta_numero'=>'complement_id', 'at_valeur'=>'string_value', 'cr_numero'=>'choice_value_id'})
      rows(:event_natures, "SELECT *, 'manual' AS usage, 10 AS duration FROM table_typetache @@@", {'th_numero'=>'thekey', 'th_libelle'=>'name'})
      rows(:events, "SELECT ap.*, TRIM(COALESCE(ap_libelle||CASE WHEN ap_description IS NULL THEN '' ELSE ' ('||ap_description||')' END, ap_description)) as reason, COALESCE(em_numero,500000076) AS employee_id, COALESCE(ap_date, ap.created_at) AS started_at, 0 AS started_sec, 'Lieu de travail' AS location FROM table_appel ap left join table_employe on (em_login=ap.updated_by) ORDER BY pe_numero @@@", {'ap_numero'=>'thekey', 'pe_numero'=>'entity_id', 'ap_duree'=>'duration', 'th_numero'=>'nature_id'})

      rows(:sequences, "SELECT sq.*, '' AS format, 1 AS number_increment, 1 AS number_start, 'number' AS period, EXTRACT(YEAR FROM CURRENT_DATE) AS last_year, EXTRACT(MONTH FROM CURRENT_DATE) AS last_month, EXTRACT(WEEK FROM CURRENT_DATE) AS last_cweek from table_societe join sequence sq using (sq_numero) WHERE so_numero=#{company_id}", 'sq_numero'=>'id', 'sq_nom'=>'name', 'sq_last'=>'last_number')

      subscription_nature = 0
      if company_code == 'SAC'
        products = {'1'=>[500000095,500000164,500000183,500000163,500000123], '2'=>[500000036,500000065,500000069], '3'=>[500000002,500000003], '4'=>[100051]}
        rows(:subscription_natures, "SELECT 1 AS thekey, 'Adhésion Adhérent FDSEA' AS name,      'period' AS nature, NULL AS actual_number, 'Adhésion de droit pour les adhérents FDSEA (15% de réduction)' AS comment #{stamps}")
        rows(:subscription_natures, "SELECT 2 AS thekey, 'Abonnement Conseil Juridique' AS name, 'period' AS nature, NULL AS actual_number, 'Abonnement Conseil (25% de réduction)' AS comment #{stamps}")
        rows(:subscription_natures, "SELECT 3 AS thekey, 'Abonnement MAJ Convention Collective' AS name, 'period' AS nature, NULL AS actual_number, 'Abon. MAJCC' AS comment #{stamps}")
        rows(:subscription_natures, "SELECT 4 AS thekey, 'Adhésion Non-Adhérent FDSEA' AS name,  'period' AS nature, NULL AS actual_number, 'Adhésion pour les non-adhérents FDSEA (0% de reduction)' AS comment #{stamps}")
        
        for k,v in products
          rows(:subscriptions, "SELECT #{k} AS nature_id, NULL AS first_number, false AS suspended, NULL AS last_number, 1 AS quantity, (EXTRACT(YEAR FROM fa_date)::TEXT||'-01-01')::DATE AS started_on, (EXTRACT(YEAR FROM fa_date)::TEXT||'-12-31')::DATE AS stopped_on,lf.*, fa.* from table_lignefacture lf JOIN table_facture fa using (fa_numero) LEFT JOIN (SELECT fa_numero AS avoir FROM table_facture WHERE fa_avoir) av ON (fa_avoir_facture=avoir) where avoir is null and pd_numero in (#{v.join(',')})", 'pd_numero'=>'product_id', 'pe_numero'=>'entity_id', 'fa_numero'=>'invoice_id', 'lf_notes'=>'comment', 'de_numero'=>'sale_order_id', 'ad_numero'=>'contact_id')
          # rows(:subscriptions, "SELECT *, false AS suspended, NULL AS first_number, NULL AS last_number, 1 AS quantity, (cs_annee::TEXT||'-01-01')::DATE AS started_on, (cs_annee::TEXT||'-12-31')::DATE AS stopped_on FROM table_cotisation", 'cs_numero'=>'thekey', 'pe_numero'=>'entity_id')
        end
      elsif company_code == 'FDS'
        products = {'1'=>[300017,300006,500000172,500000052,500000150,500000053,500000162,500000124,500000054]}
        rows(:subscription_natures, "SELECT 1 AS thekey, 'Adhésion FDSEA' AS name, 'period' AS nature, NULL AS actual_number, 'Adhésion à la FDSEA (la seule et unique)' AS comment #{stamps}")
        rows(:subscriptions, "SELECT *, false AS suspended, NULL AS first_number, NULL AS last_number, 1 AS quantity, bml_extract(cs_detail, 'fdsea.forfait.produit') AS product_id, bml_extract(cs_detail, 'fdsea.facture') AS invoice_id, 1 AS nature_id, (cs_annee::TEXT||'-01-01')::DATE AS started_on, (cs_annee::TEXT||'-12-31')::DATE AS stopped_on FROM table_cotisation", 'cs_numero'=>'thekey', 'pe_numero'=>'entity_id', 'cs_detail'=>'comment')
        #        rows(:subscriptions, "SELECT 1 AS nature_id, NULL AS first_number, false AS suspended, NULL AS last_number, 1 AS quantity, (EXTRACT(YEAR FROM fa_date)::TEXT||'-01-01')::DATE AS started_on, (EXTRACT(YEAR FROM fa_date)::TEXT||'-12-31')::DATE AS stopped_on,lf.* from table_lignefacture lf JOIN table_facture using (fa_numero) LEFT JOIN (SELECT fa_numero AS avoir FROM table_facture WHERE fa_avoir) av ON (fa_avoir_facture=avoir) where avoir is null and pd_numero in (300017,300006,500000172,500000052,500000150,500000053,500000162,500000124,500000054)", 'pd_numero'=>'product_id')
      elsif company_code == 'AAV'
        products = {'1'=>[1400002,1400006,500000094,500000096,500000098,500000099,500000100,500000109,500000125]}
        rows(:subscription_natures, "SELECT 1 AS thekey, 'Avenir Aquitain' AS name, 'quantity' AS nature, cs_valeur AS actual_number, NULL AS comment #{stamps} FROM table_constante WHERE cs_nom='CURRENT_NUMBER'")
        rows(:subscriptions, "SELECT ro.*, 1 AS nature_id, NULL AS started_on, NULL AS stopped_on, de_numero AS sale_order_id, COALESCE(pd_numero, 500000125) AS product_id FROM table_routage ro left join table_facture using (fa_numero) left join table_lignefacture using (fa_numero) @@@", {'ro_numero'=>'thekey', 'ro_debutservice'=>'first_number', 'ro_finservice'=>'last_number', 'ad_numero'=>'contact_id', 'ro_suspendu'=>'suspended', 'ro_quantite'=>'quantity', 'fa_numero'=>'invoice_id', 'pe_numero'=>'entity_id'})
      end

      subscription_nature = "CASE "+products.collect{|k,v| "WHEN pd.pd_numero IN (#{v.join(',')}) THEN #{k}"}.join(" ")+" ELSE NULL END"
      product_nature = "CASE "+products.collect{|k,v| "WHEN pd.pd_numero IN (#{v.join(',')}) THEN 'subscrip'"}.join(" ")+" ELSE 'service' END"

      rows(:products, "SELECT pd.*, pd_id AS number, #{subscription_nature} AS subscription_nature_id, 1 AS unit_id, 1 AS shelf_id, #{product_nature} AS nature, false AS manage_stocks, true AS to_sale, false AS to_purchase, false AS to_rent, 'buy' AS supply_method, 1 AS critic_quantity_min, 5 AS quantity_min, pd_libelle||' ('||pd_id||')' AS name, ci.cg_numero AS product_account_id, 0 AS weight FROM table_produit pd LEFT JOIN table_compteproduit ci ON (pd.pd_numero=ci.pd_numero AND ci_actif) WHERE so_numero=#{company_id} @@@", {'pd_numero'=>'thekey', 'pd_titre'=>'catalog_name', 'pd_actif'=>'active', 'pd_id'=>'code', 'pd_reduction'=>'reduction_submissive', 'pd_sansquantite'=>'unquantifiable'})
      rows(:taxes, "SELECT *, NOT tv_actif AS deleted, true AS reductible, false AS included, 'percent' AS nature, NULL AS description, NULL AS account_paid_id FROM table_tva WHERE so_numero=#{company_id} @@@", {'tv_numero'=>'thekey', 'tv_taux'=>'amount', 'tv_code'=>'name', 'cg_numero'=>'account_collected_id'})
      rows(:prices, "SELECT px.*, #{maximum_id} AS entity_id, 1 AS category_id, px_actif AS \"default\", 1 AS currency_id, false AS use_range, 0 AS quantity_min, 0 AS quantity_max FROM table_prix px join table_produit using (pd_numero) WHERE so_numero=#{company_id} @@@", {'px_numero'=>'thekey', 'pd_numero'=>'product_id', 'px_tarifht'=>'amount', 'px_tarifttc'=>'amount_with_taxes', 'tv_numero'=>'tax_id', 'px_actif'=>'active', 'px_datedebut'=>'started_at', 'px_datefin'=>'stopped_at'})
      rows(:sale_orders, "SELECT *, 1 AS expiration_id, 'P' AS state, COALESCE(de_montantht,0) AS amount, COALESCE(de_montantttc,0) AS amount_with_taxes, de_numero AS number, COALESCE(de_acompte, false) AS has_downpayment, 1 AS payment_delay_id, 1 AS nature_id, 'wt' AS sum_method, de_date+'1 month'::INTERVAL AS expired_on, ad_numero AS invoice_contact_id, ad_numero AS delivery_contact_id, ROUND(0.3*COALESCE(de_montantttc,0), 2) AS downpayment_amount FROM table_devis WHERE so_numero=#{company_id} @@@", {'de_numero'=>'thekey', 'de_libelle'=>'comment', 'pe_numero'=>'client_id', 'de_introduction'=>'introduction', 'de_civilites'=>'function_title', 'de_date'=>'created_on', 'de_locked'=>'invoiced', 'de_lettre'=>'letter_format', 'em_numero'=>'responsible_id', 'ad_numero'=>'contact_id'})
      rows(:sale_order_lines, "SELECT l.*, 0 AS position, 1 AS location_id, 1 AS unit_id, cg_numero AS account_id, de_locked AS invoiced FROM table_ligne l JOIN table_devis USING (de_numero) left join table_compteproduit using (pd_numero) WHERE ci_actif AND so_numero=#{company_id} @@@", {'de_numero'=>'order_id', 'l_numero'=>'thekey', 'pd_numero'=>'product_id', 'px_numero'=>'price_id', 'l_quantite'=>'quantity', 'l_montantht'=>'amount', 'l_montantttc'=>'amount_with_taxes', 'l_notes'=>'annotation', 'pe_numero'=>'entity_id'})
      rows(:invoices, "SELECT *, CASE WHEN fa.fa_montantttc>0 THEN 'S' ELSE 'C' END AS nature, 1 AS payment_delay_id, fa_date+'1 month'::INTERVAL AS payment_on, fa_ok AS paid, COALESCE(fa_accompte,0)>0 AS has_downpayment, COALESCE(fa_accompte,0) AS downpayment_amount FROM table_facture fa left join vue_facture_regle using(fa_numero) WHERE fa.so_numero=#{company_id} @@@", {'fa_numero'=>'thekey', 'de_numero'=>'sale_order_id', 'pe_numero'=>'client_id', 'fa_numfact'=>'number', 'fa_date'=>'created_on', 'fa_avoir_facture'=>'origin_id', 'fa_montantht'=>'amount', 'fa_montantttc'=>'amount_with_taxes', 'fa_perte'=>'lost', 'ad_numero'=>'contact_id', 'fa_avoir'=>'credit', 'fa_annotation'=>'annotation'})
      rows(:invoice_lines, "SELECT l.*, 0 AS position, ld.l_numero AS order_line_id FROM table_lignefacture l join table_facture fa using (fa_numero) join table_ligne ld ON (ld.pd_numero=l.pd_numero AND fa.de_numero=ld.de_numero) WHERE so_numero=#{company_id} @@@", {'lf_numero'=>'thekey', 'fa_numero'=>'invoice_id', 'pd_numero'=>'product_id', 'px_numero'=>'price_id', 'lf_montantht'=>'amount', 'lf_montantttc'=>'amount_with_taxes', 'lf_quantite'=>'quantity', 'lf_notes'=>'annotation', 'pe_numero'=>'entity_id'})
      rows(:embankments, "SELECT *, true AS locked, 1 AS bank_account_id FROM table_listereglement JOIN (SELECT lr_numero, count(rg_numero) AS payments_count from table_reglement group by 1) as c USING (lr_numero) WHERE so_numero=#{company_id} @@@", {'lr_numero'=>'thekey', 'lr_montant'=>'amount', 'lr_date'=>'created_on', 'lr_commentaire'=>'comment', 'mr_numero'=>'mode_id', 'em_numero'=>'embanker_id'})
      rows(:payments, "SELECT rg.*, COALESCE(rg.created_at::DATE, rg_date, '0001-01-01'::DATE) AS to_bank_on, true AS received, false AS scheduled, parts_amount FROM table_reglement rg LEFT JOIN (SELECT table_facturereglement.rg_numero, sum(table_facturereglement.fr_montant) AS parts_amount FROM table_facturereglement GROUP BY table_facturereglement.rg_numero) pa USING (rg_numero) WHERE so_numero=#{company_id} @@@", {'rg_numero'=>'thekey', 'pe_numero'=>'entity_id', 'rg_reference'=>'check_number', 'rg_montant'=>'amount', 'mr_numero'=>'mode_id', 'rg_numerocompte'=>'account_number', 'rg_libellebanque'=>'bank', 'lr_numero'=>'embankment_id', 'em_numero'=>'embanker_id', 'rg_date'=>'paid_on'})
      rows(:payment_parts, "SELECT fr.*, COALESCE(de_numero,0) AS order_id FROM table_facturereglement fr join table_reglement rg using (rg_numero) join table_facture using (fa_numero) WHERE rg.so_numero=#{company_id} @@@", {'fr_numero'=>'thekey', 'rg_numero'=>'payment_id', 'fr_montant'=>'amount', 'fr_acompte'=>'downpayment', 'fa_numero'=>'invoice_id'})
      rows(:payment_modes, "SELECT *, 1 AS bank_account_id, CASE WHEN mr_cheque THEN 'check' ELSE 'other' END AS mode, 'U' AS nature FROM table_modereglement WHERE so_numero=#{company_id} @@@", {'mr_numero'=>'thekey', 'mr_libelle'=>'name', 'cg_numero'=>'account_id'})
      if @mode==:xml
        @file.write "  </company>\n"
        @file.write "</backup>"
      end
      @file.close
      

    end
    puts (Time.now.to_i-@start).to_s+" secondes"
    puts @reflections.join(", ")
  end

end


if ARGV.size>0
  file = ARGV[0]
  code, ext = file.split(/\./)
  Migrator.new.migrate(code, (ext||:xml).to_sym, !ARGV[1].nil?)
else
  puts "Usage: gst2eky file.ext [debug]"
end

