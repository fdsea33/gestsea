<?xml version="1.0" encoding="UTF-8"?>
<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">
  <output method="text" omit-xml-declaration="yes" encoding="UTF-8"/>
  <variable name="majuscules">ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ</variable>
  <variable name="minuscules">abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþ</variable>
  
  <template match="/">
<text>#!/bin/sh
project=</text><value-of select="translate(analysis/@rails,$majuscules,$minuscules)"/><text>
database=</text><value-of select="translate(analysis/@database,$majuscules,$minuscules)"/><text>
echo "\033[01;37m Rails \033[00m"
rails -d -C -D postgresql ${project}
cd ${project}

echo "\033[01;37m Database \033[00m"
dir=config
echo "development:" > $dir/database.yml
echo "  adapter: postgresql" >> $dir/database.yml
echo "  encoding: unicode" >> $dir/database.yml
echo "  database: ${database}" >> $dir/database.yml
echo "  username: rails" >> $dir/database.yml
echo "  password: R4|L5" >> $dir/database.yml

echo "\033[01;37m Controller \033[00m"
# controller CRUD
controller=admin
Controller=Admin
dir=app/controllers
ruby script/generate controller $controller
echo "class ${Controller}Controller &lt; ApplicationController" > $dir/${controller}_controller.rb
#echo "	scaffold_all_models" >> $dir/${controller}_controller.rb
echo "end" >> $dir/${controller}_controller.rb

echo "\033[01;37m Migration \033[00m"
migration=create_base
Migration=CreateBase
dir=db/migrate
ruby script/generate migration $migration
echo "class ${Migration} &lt; ActiveRecord::Migration" > $dir/001_${migration}.rb
echo "  def self.up" >> $dir/001_${migration}.rb
</text>
				<apply-templates select="analysis/table" mode="migrate-tables">
					<sort select="@name"/>
					<with-param name="filename">$dir/001_${migration}.rb</with-param>
				</apply-templates>
<text>
echo "  end" >> $dir/001_${migration}.rb
echo "  def self.down" >> $dir/001_${migration}.rb
echo "  end" >> $dir/001_${migration}.rb
echo "end" >> $dir/001_${migration}.rb

echo "\033[01;37m Models \033[00m"
# models
</text>
        <apply-templates select="analysis/table[count(column[@pkey='true'])>0]" mode="generate_models">
					<sort select="@name"/>
				</apply-templates>
				<text>

# models update
dir=app/models
</text>
        <apply-templates select="analysis/table[count(column[@pkey='true'])>0]" mode="update_models">
					<sort select="@name"/>
				</apply-templates>

echo "\033[01;37m Plugins \033[00m"
# plugins
#ruby script/plugin install --force http://www.redhillonrails.org/svn/branches/stable-1.2/vendor/plugins/redhillonrails_core
#sleep 1
#ruby script/plugin install --force http://www.redhillonrails.org/svn/branches/stable-1.2/vendor/plugins/foreign_key_associations
#sleep 1
#ruby script/plugin install --force http://www.redhillonrails.org/svn/branches/stable-1.2/vendor/plugins/foreign_key_migrations
#sleep 1
#ruby script/plugin install --force http://www.redhillonrails.org/svn/branches/stable-1.2/vendor/plugins/schema_validations
#sleep 1
ruby script/plugin install --force svn://code.jeremyevans.net/rails/plugins/scaffolding_extensions
#ruby script/plugin install --force http://repo.pragprog.com/svn/Public/plugins/annotate_models
#rake annotate_models
#rake db:schema:dump
cd ..
  </template>



  <template match="table" mode="generate_models">
ruby script/generate model --skip-migration --quiet <value-of select="translate(@name,$majuscules,$minuscules)"/> 
  </template>

  <template match="table" mode="update_models">
		<variable name="filename">$dir/<value-of select="translate(@name,$majuscules,$minuscules)"/>.rb</variable>
echo "class <call-template name="capitalize"><with-param name="string"><value-of select="@name"/></with-param></call-template> &lt; ActiveRecord::Base" > <value-of select="$filename"/>
echo "  set_table_name \"<value-of select="../@table"/><value-of select="translate(@name,$majuscules,$minuscules)"/>\"" >> <value-of select="$filename"/>
<if test="count(column[@pkey='true'])=1">
echo "  set_sequence_name \"seq_<value-of select="translate(@name,$majuscules,$minuscules)"/>\"" >> <value-of select="$filename"/>
echo "  set_primary_key \"<value-of select="translate(column[@pkey='true']/@name,$majuscules,$minuscules)"/>\"" >> <value-of select="$filename"/></if>
<apply-templates select="column[@fkey!='']" mode="update_models">
			<with-param name="filename"><value-of select="$filename"/></with-param>
		</apply-templates>
    <variable name="tabol"><value-of select="@name"/></variable>
	  <apply-templates select="../table/column[substring-before(@fkey,'(')=$tabol]" mode="update_models-has_many">
			<with-param name="filename"><value-of select="$filename"/></with-param>
		</apply-templates>
echo "end" >> <value-of select="$filename"/>
  </template>



  <template match="column" mode="update_models">
		<param name="filename">$dir/001_create_base.rb</param>
echo "	belongs_to :<value-of select="translate(substring-before(@fkey,'('),$majuscules,$minuscules)"/>, :foreign_key=>:<value-of select="translate(substring-before(substring-after(@fkey,'('),')'),$majuscules,$minuscules)"/>" >> <value-of select="$filename"/>
  </template>

  <template match="column" mode="update_models-has_many">
		<param name="filename">$dir/001_create_base.rb</param>
    <variable name="tabol"><value-of select="../@name"/></variable>
		<choose>
			<when test="count(../../table[@name=$tabol and count(pkey)=0])=1">
echo "	has_many '<value-of select="translate(../@name,$majuscules,$minuscules)"/>'.pluralize.to_sym, :foreign_key=>:<value-of select="translate(@name,$majuscules,$minuscules)"/>" >> <value-of select="$filename"/>
</when>
			<otherwise><!--
echo "	has_and_belongs_to_many ''.pluralize.to_sym, :join_table=>:<value-of select="translate(../@name,$majuscules,$minuscules)"/>" >> <value-of select="$filename"/>
--></otherwise>
		</choose>
  </template>



  <template match="table" mode="migrate-tables">
		<param name="filename">$dir/001_create_base.rb</param>
echo "    create_table :<value-of select="translate(@name,$majuscules,$minuscules)"/> do |t|" >> <value-of select="$filename"/>
		<apply-templates select="column" mode="migrate-tables">
			<with-param name="filename"><value-of select="$filename"/></with-param>
		</apply-templates>
echo "    end" >> <value-of select="$filename"/>
  </template>

  <template match="column" mode="migrate-tables">
		<param name="filename">$dir/001_create_base.rb</param>
echo "      t.column :<value-of select="translate(@name,$majuscules,$minuscules)"/>, :<choose>
	<when test="@type='CHAR'">char</when> 
	<when test="contains(@type,'TEXT')">text</when>
	<when test="contains(@type,'VARCHAR') or contains(@type,'CHAR')">string<if test="contains(@type,'(') and contains(@type,')')">, :limit=><value-of select="substring-before(substring-after(@type,'('),')')"/></if></when>
	<when test="@type='INT4' or @type='SMALLINT' or @type='INTEGER' or @type='SERIAL'">integer</when>
	<when test="@type='FLOAT8' or @type='FLOAT' or @type='DOUBLE'">float</when>
	<when test="contains(@type,'NUMERIC')">decimal<choose>
<when test="contains(@type,'(') and contains(@type,',') and contains(@type,')')">, :precision=><value-of select="substring-before(substring-after(@type,'('),',')"/>, :scale=><value-of select="substring-before(substring-after(@type,','),')')"/></when>
<when test="contains(@type,'(') and contains(@type,')')">, :precision=><value-of select="substring-before(substring-after(@type,'('),')')"/></when>
<otherwise/></choose></when>
	<when test="@type='BOOL' or @type='BOOLEAN'">boolean</when>
	<when test="@type='DATE'">date</when>
	<when test="@type='GEOMETRY' or @type='BYTEA'">binary</when>
	<when test="@type='TIMESTAMP' or @type='DATETIME'">datetime</when>
	<when test="@type='TIME'">time</when>
</choose><if test="@notnull='true'">, :null=>false</if><choose>
	<when test="@fkey!=''">, :references=>'<value-of select="translate(substring-before(@fkey,'('),$majuscules,$minuscules)"/>'.pluralize.to_sym</when>
	<otherwise>, :references=>nil</otherwise>
</choose>" >> <value-of select="$filename"/>
  </template>


	<template name="capitalize">
		<param name="string">capitalize</param>
		<value-of select="translate(substring($string,1,1),$minuscules,$majuscules)"/>
		<value-of select="translate(substring($string,2,string-length($string)),$majuscules,$minuscules)"/>
	</template>


	<template name="replace">
		<param name="ligne"/><param name="motif"> </param><param name="objet"/>
		<if test="not(contains($ligne,$motif))"><value-of select="$ligne"/></if>
		<if test="contains($ligne,$motif)">
			<value-of select="substring-before($ligne,$motif)"/>
			<value-of select="$objet"/>
			<call-template name="replace">
				<with-param name="ligne"><value-of select="substring-after($ligne,$motif)"/></with-param>
				<with-param name="motif"><value-of select="$motif"/></with-param>
				<with-param name="objet"><value-of select="$objet"/></with-param>
			</call-template>
		</if>
	</template>

  <template match="table" mode="create">
		create_table :<value-of select="@name"/> do |t|
		end
  </template>



  <template match="analysis" mode="pretraitement">
--
-- Pré-traitement général
--
CREATE TABLE <value-of select="@table"/>(id int);
SELECT 'DROP TABLE '||concatenate(tablename||',')||'<value-of select="@table"/> CASCADE' from pg_tables where schemaname='public' and tablename not ilike '<value-of select="@table"/>%' INTO query;
EXECUTE query;
CREATE VIEW the_one AS SELECT 1;
SELECT 'DROP VIEW '||concatenate(viewname||',')||'the_one CASCADE' from pg_tables where schemaname='public' INTO query;
EXECUTE query;

--
-- Ajout des ids (primaires et étrangères)
--
    <apply-templates select="table" mode="add-id"/>
    <apply-templates select="table[count(column[@fkey])>0]" mode="add-fkey"/>

  </template>


  <template match="table" mode="add-id">
    <text>ALTER TABLE </text>
    <value-of select="../@table"/><value-of select="@name"/>
    <text> ADD id SERIAL UNIQUE;
</text>
  </template>

  <template match="table" mode="add-fkey">
    <text>-- </text>
    <value-of select="@name"/>
    <text>
</text>
    <apply-templates select="column" mode="add-fkey"/>
  </template>

  <template match="column" mode="add-fkey">
    <if test="@fkey">
      <text>ALTER TABLE </text>
      <value-of select="../../@table"/>
      <value-of select="../@name"/>
      <text> ADD </text>
      <value-of select="../@rails"/>
      <text> INTEGER;
</text>
      <text>UPDATE </text>
      <value-of select="../../@table"/>
      <value-of select="../@name"/>
      <text> SET </text>
      <value-of select="../@rails"/>
      <text>=</text>
      <value-of select="../../@table"/>
      <value-of select="substring-before(@fkey,'(')"/>
      <text>.id</text>
      <text> WHERE </text>
      <value-of select="../../@table"/>
      <value-of select="../@name"/>
      <text>.</text>
      <value-of select="@name"/>
      <text>=</text>
      <value-of select="../../@table"/>
      <value-of select="substring-before(@fkey,'(')"/>
      <text>.</text>
      <value-of select="substring-before(substring-after(@fkey,'('),')')"/>
      <text>;
</text>   
    </if>
  </template>






</stylesheet>
