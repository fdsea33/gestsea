<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">

  <xsl:output method="xml" encoding="UTF-8" version="1.0" indent="no"/>

<!--  <xsl:variable name="color_column_bg">#E0E7F7</xsl:variable>-->
  <xsl:variable name="color_column_bg">#E0e0FF</xsl:variable>
  <xsl:variable name="color_desc_bg"><xsl:value-of select="$color_column_bg"/></xsl:variable> <!-- #EDEEFF -->
  <xsl:variable name="color_grant_bg"><xsl:value-of select="$color_column_bg"/></xsl:variable>
  <xsl:variable name="color_header_bg">#00007F</xsl:variable>
  <xsl:variable name="color_header_fg">#FFFFFF</xsl:variable>
  <xsl:variable name="color_pk_bg">#DFD</xsl:variable>
  <xsl:variable name="color_pk_fg">#0000FF</xsl:variable>
  <xsl:variable name="color_cont_fg">#A020F0</xsl:variable>
  <xsl:variable name="color_revoke_bg"><xsl:value-of select="$color_pk_bg"/></xsl:variable>
  <xsl:variable name="color_seq_bg"><xsl:value-of select="$color_column_bg"/></xsl:variable>
  <xsl:variable name="nb_columns">6</xsl:variable>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Modèle conceptuel de données <xsl:value-of select="analysis/@name"/></title>
        <style TYPE="text/css">
* {margin:0;padding:0;}
body, p, div, span { color: <xsl:value-of select="$color_header_bg"/>; }
body, p, div, span, a, td, th {font-size:11px; FONT-FAMILY: Trebuchet MS, Verdana, Arial, Helvetica, sans-serif;}
body { padding: 8px; }
hr { color: <xsl:value-of select="$color_header_bg"/>; }
a         { color: #3040E0; text-decoration : none;}
a:link    { color: #3040E0; text-decoration : none;}
a:visited { color: #3040E0; text-decoration : none;}
a:hover   {text-decoration : underline;}

h2 {margin: 32px 4px 8px;}
h3 {margin: 16px 8px 4px;}
/*th { color:<xsl:value-of select="$color_header_fg"/>; background: <xsl:value-of select="$color_header_bg"/>; font-weight: normal; }*/
th { color: #005; background: #aac; padding: 2px;}
td { padding: 1px 2px; }

.sommaire { border : 1px solid <xsl:value-of select="$color_header_bg"/>; padding : 10px; }

.table { border:1px solid #AAC; border-collapse : collapse; background-color : <xsl:value-of select="$color_column_bg"/>; width:100%; }

tr.pkey td { background: <xsl:value-of select="$color_pk_bg"/>; }
tr.odd td { background: #e0e7ff; }
tr.even td { background: #EbF4FF; }
tr.part { border : 1px solid #AAC; }
tr.title td {background: white; border-top: 1px solid #AAC; border-left: 1px solid white; border-right: 1px solid white;}

.kw {color:<xsl:value-of select="$color_cont_fg"/>}
.small {font-size: 9px;}

.texte { margin: 4px 0px; padding : 6px 8px; background-color : #DDF; border-left : 4px solid #779;}
#corps { display:table-row;}

div.td { display          : table-cell;}
/*
#menu h3 {clear: both; }
#menu li {float:left; margin: 0px 10px;}
*/
ul { padding-left: 1.2em; margin: 0px; }
li { list-style-type  : square; }
li.nopuce { list-style-type  : none; }
hr.bt { border: 1px solid <xsl:value-of select="$color_header_bg"/>; margin-top: 1em; margin-bottom: 4em; }
        </style>
      </head>
      <body>

        <center><h1 id="top">Modèle conceptuel de données <i><xsl:value-of select="analysis/@name"/></i></h1></center>

	<xsl:if test="analysis/text!=''">
          <h2>Introduction</h2>
          <xsl:apply-templates select="analysis/text"/>
        </xsl:if>

	<h2 id="rapport">Statistiques</h2>
        <div class="texte">        
Le modèle conceptuel de données comporte <b><xsl:value-of select="count(analysis/table)"/></b>
tables soient :
          <ul> 
            <li><xsl:value-of select="count(analysis/table[0>=count(column[@pkey='true'])])"/> tables sans clés primaires simples,</li>
            <li><xsl:value-of select="count(analysis/table[0>=count(column[@fkey!=''])])"/> tables sans clés étrangères,</li>
            <li><xsl:value-of select="count(analysis/table/seq)"/> séquences,</li>
            <li><xsl:value-of select="count(analysis/table/column)+count(analysis/table/pkey)"/> champs dont :
               <ul>
                 <li><xsl:value-of select="count(analysis/table/column[@fkey!=''])"/> clés étrangères,</li>
                 <li><xsl:value-of select="count(analysis/table/column[@pkey='true'])"/> clés primaires simples et <xsl:value-of select="count(analysis/table/pkey)"/> clés primaires composées</li>
               </ul>
            </li>
          </ul>
 La table moyenne comporte <xsl:value-of select="(count(analysis/table/column)+count(analysis/table/pkey)) div count(analysis/table)"/> champs dont <xsl:value-of select="count(analysis/table/column[@fkey!='']) div count(analysis/table)"/> clés étrangères.<br/>
Le taux de liaison est de <xsl:value-of select="100 * (count(analysis/table/column[@fkey!='']) div count(analysis/table/column[not(@pkey='true')]))"/>%.<br/>
        </div>
 
	<h2>Rapport d'erreurs</h2>
        <div class="texte">
          <ul>
            <li><xsl:value-of select="count(analysis/table/column[@fkey!='' and not(../../table/@name=substring-before(@fkey,'(') and ../../table/column/@name=substring-before(substring-after(@fkey,'('),')') )])"/>
              <xsl:text> lien(s) défectueux :</xsl:text>
              <ul>
                <xsl:apply-templates select="analysis/table/column[@fkey!='' and not(../../table/@name=substring-before(@fkey,'(') and ../../table/column/@name=substring-before(substring-after(@fkey,'('),')') )]" mode="liste"/>
              </ul>
            </li>
            <li> 
              <xsl:value-of select="count(analysis/table/column[@name='' or @type=''])"/>
              <xsl:text> champ(s) avec des attributs obligatoires (nom ou type) manquants :</xsl:text>
              <ul>
                <xsl:apply-templates select="analysis/table/column[@name='' or @type='']" mode="liste"/>
              </ul>
            </li>
            <li> 
              <xsl:value-of select="count(analysis/table[@label=''])"/>
              <xsl:text> table(s) sans libellé :</xsl:text>
              <ul>
                <xsl:apply-templates select="analysis/table[@label='']" mode="li-name"/>
              </ul>
            </li>
          </ul>
        </div>	

	<h2 id="tdm">Liste des <xsl:value-of select="count(analysis/table)"/> tables</h2>
        <div id="menu">
          <h3>Par nom</h3>
          <xsl:apply-templates select="analysis/table" mode="a-name">
            <xsl:sort select="@name"/>
          </xsl:apply-templates>
          <h3>Par libellé</h3>
          <xsl:apply-templates select="analysis/table" mode="a-label">
            <xsl:sort select="@label"/>
          </xsl:apply-templates>
        </div>            

	<h2 id="tdm">Liste des <xsl:value-of select="count(analysis/table)"/> tables</h2>
	<table class="table">
          <xsl:apply-templates select="analysis/table" mode="std">
	    <xsl:sort select="@name"/>
          </xsl:apply-templates>
	</table>

	<br/><hr class="bt"/><i>Generated by Brice from Brive</i>

      </body>
    </html>
  </xsl:template>


  <xsl:template match="table" mode="li-name">
    <li><a href="#{@name}"><xsl:value-of select="@name"/><xsl:if test="count(pkey)>0"><span style="color:red">*</span></xsl:if><xsl:if test="@underscore!='***'"><span style="color:black">*</span></xsl:if></a></li>
  </xsl:template>

  <xsl:template match="table" mode="li-label">
    <li><a href="#{@name}"><xsl:value-of select="@label"/></a></li>
  </xsl:template>

  <xsl:template match="table" mode="a-name">
    <a href="#{@name}"><xsl:value-of select="@name"/><xsl:if test="count(pkey)>0"><span style="color:red">*</span></xsl:if><xsl:if test="@underscore!='***'"><span style="color:black">*</span></xsl:if></a>
    <xsl:text>, </xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="a-label">
    <a href="#{@name}"><xsl:value-of select="@label"/></a>
    <xsl:text>, </xsl:text>
  </xsl:template>


  <xsl:template match="table" mode="std">
   <!-- <h3 id="{@name}"><xsl:value-of select="position()"/>. <b><xsl:value-of select="../@table"/><xsl:value-of select="@name"/></b> : table des <xsl:value-of select="translate(@label,'ABCDEÉFGHIÎJKLMNOPQRSTUVWXYZ','abcdeéfghiîjklmnopqrstuvwxyz')"/></h3>

    <xsl:apply-templates select="text"/>

    <table class="table" width="100%">-->
   <tr class="title" id="{@name}"><td colspan="{$nb_columns}"><h3><xsl:value-of select="position()"/>. <b><xsl:value-of select="../@table"/><xsl:value-of select="@name"/></b> : table des <xsl:value-of select="translate(@label,'ABCDEÉFGHIÎJKLMNOPQRSTUVWXYZ','abcdeéfghiîjklmnopqrstuvwxyz')"/></h3></td></tr>

   <xsl:if test="@text!=''">
     <tr><td colspan="{$nb_columns}"><xsl:apply-templates select="text"/></td></tr>
   </xsl:if>

   <xsl:if test="@select!='' or @where!='' or @order!='' or @from!=''">
	<tr class="part">
          <th colspan="{$nb_columns}">Requête de la vue <i><xsl:value-of select="../@view"/><xsl:value-of select="@name"/></i></th>
	</tr>
	
	<tr>
          <td colspan="{$nb_columns}">
            <span class="kw">SELECT </span>
            <xsl:apply-templates select="column" mode="liste-virgule"/>
	    <xsl:if test="@select!=''">
              <xsl:text>, </xsl:text>
	      <xsl:value-of select="@select"/>
            </xsl:if>
            <br/>
            <span class="kw">  FROM </span>
            <xsl:value-of select="@name"/>
            <xsl:if test="@from!=''">
              <a>, </a>
              <xsl:value-of select="@from"/>
            </xsl:if>
            <xsl:if test="@where!=''">
              <br/>
              <span class="kw">  WHERE </span>
              <xsl:value-of select="@where"/>
            </xsl:if>
            <a>;</a>
          </td>
	</tr>
      </xsl:if>

      <tr class="part">
        <th>Champs (<xsl:value-of select="count(column)"/>)</th>
<!--        <th>Label</th>-->
        <th>Type</th>
        <th>N</th>
        <th>Val. défaut</th>
        <th>Contraintes</th>
<!--	<th>Référence...</th>-->
	<th>Description</th>
      </tr>

      <xsl:apply-templates select="column">
        <xsl:with-param name="fkey"/>
      </xsl:apply-templates>

      <xsl:apply-templates select="pkey"/>


      <!--  AUTORISATIONS  -->
<!--
      <xsl:if test="count(./grant)+count(./revoke)>0">
        <tr class="part">
          <th rowspan="{count(grant)+count(revoke)+1}" align="center">Autorisations</th>
        </tr>
	<xsl:apply-templates select="grant">
	  <xsl:sort select="@to"/>
	</xsl:apply-templates>
	<xsl:apply-templates select="revoke">
	  <xsl:sort select="@from"/>
	</xsl:apply-templates>
      </xsl:if>
-->
      <!--  SEQUENCES  -->

<!--
      <xsl:if test="seq/@name!=''">
        <tr class="part">
          <th rowspan="{count(./seq)+1}" align="center">Séquences</th>
        </tr>
        <xsl:apply-templates select="./seq"/>
      </xsl:if>
-->
      <!--  RULES  -->
<!--
      <xsl:if test="rule/@on!=''">
        <tr>
          <th rowspan="{count(rule)+1}" align="center" style="color:{$color_header_fg}; background: {$color_header_bg};">Règles</th>
        </tr>
        <xsl:apply-templates select="rule"/>
      </xsl:if>
-->
      <!--  REFERENCED  -->

      <xsl:variable name="tabol"><xsl:value-of select="@name"/></xsl:variable>
      <xsl:variable name="nb_ref"><xsl:value-of select="count(../table/column[substring-before(@fkey,'(')=$tabol])"/></xsl:variable>
      <xsl:if test="$nb_ref>0">
<!--
        <tr class="part">
          <th align="center">
            <xsl:choose>
              <xsl:when test="$nb_ref=1"><xsl:text>Référence</xsl:text></xsl:when>
              <xsl:otherwise>
                <xsl:text>Références</xsl:text>
                <br/>
                <xsl:text> (</xsl:text>
	        <xsl:value-of select="$nb_ref"/>
                <xsl:text>)</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </th>
          <td colspan="{number($nb_columns)-1}" style="padding : 0px;">
            <table width="100%" style="border-collapse: collapse; width: 100%; height: 100%;">
              <xsl:apply-templates select="../table/column[substring-before(@fkey,'(')=$tabol]">
		<xsl:sort select="../@name"/>
                <xsl:with-param name="fkey">yes</xsl:with-param>
	      </xsl:apply-templates>
	    </table>
	  </td>
	</tr>
-->	
        <tr class="part">
          <th colspan="{$nb_columns}">
            <xsl:choose>
              <xsl:when test="$nb_ref=1"><xsl:text>Référencée par...</xsl:text></xsl:when>
              <xsl:otherwise>
                <xsl:text>Référencée </xsl:text>
	        <xsl:value-of select="$nb_ref"/>
                <xsl:text> fois par...</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </th>
	</tr>
        <xsl:apply-templates select="../table/column[substring-before(@fkey,'(')=$tabol]">
	  <xsl:sort select="../@name"/>
          <xsl:with-param name="fkey">yes</xsl:with-param>
	</xsl:apply-templates>
	
      </xsl:if>


<!--    </table>-->
<!--
    <a href="#tdm">Retour au sommaire</a> | <a href="#rapport">Retour au rapport</a> | <a href="#top">Haut de page</a>
    <hr class="bt"/>
-->
  </xsl:template>


  <xsl:template match="text">
    <xsl:apply-templates name="bidon"/>
  </xsl:template>


  <xsl:template match="text" mode="desc">
    <xsl:apply-templates name="bidon"/>
  </xsl:template>


  <xsl:template match="seq">
    <tr>
      <td align="right" valign="top"><b><xsl:value-of select="@name"/></b></td>
      <td colspan="{number($nb_columns)-2}" rowspan="1" nowrap="yes"> est une séquence<xsl:if test="@start!=''"> qui commence à <b><xsl:value-of select="@start"/></b>.</xsl:if></td>
    </tr>
  </xsl:template>


  <xsl:template match="column" mode="liste">
    <li>
      <a href="#{../@name}"><xsl:value-of select="../@name"/></a>(<a href="#{../@name}({@name})"><xsl:value-of select="@name"/></a>)
      <xsl:if test="@fkey!=''">
        <xsl:text> &gt;&gt; </xsl:text>
        <a href="#{normalize-space(substring-before(@fkey,'('))}"><xsl:value-of select="normalize-space(substring-before(@fkey,'('))"/></a>(<a href="#{@fkey}"><xsl:value-of select="normalize-space(substring-before(substring-after(@fkey,'('),')'))"/></a><xsl:text>)</xsl:text>
      </xsl:if>
    </li>
  </xsl:template>


  <xsl:template match="column" mode="liste-virgule">
    <xsl:value-of select="../@name"/>
    <xsl:text>.</xsl:text>
    <xsl:value-of select="@name"/>
    <xsl:if test="position()!=last()">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="column">
    <xsl:param name="fkey">no</xsl:param>
    <xsl:variable name="color">
      <xsl:choose>
        <xsl:when test="@pkey='true'">pkey</xsl:when>
        <xsl:when test="position() mod 2=1">odd</xsl:when>
        <xsl:otherwise>even</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <tr class="{$color}">
      <td>
        <xsl:choose>
	  <xsl:when test="$fkey='yes'">
	    <a href="#{../@name}"><xsl:value-of select="../@name"/></a>(<a href="#{../@name}({@name})"><xsl:value-of select="@name"/></a><a>)</a>
	  </xsl:when>
	  <xsl:otherwise>
	    <span id="{../@name}({@name})"><xsl:value-of select="@name"/></span>
	  </xsl:otherwise>
	</xsl:choose>
      </td>
<!--
      <td>
        <xsl:value-of select="@label"/>
      </td>
-->
      <td>
        <xsl:choose>
          <xsl:when test="contains(@type,'VARCHAR')"><span style="color:#CF0000"><xsl:value-of select="@type"/></span></xsl:when>
          <xsl:when test="contains(@type,'CHAR')"><span style="color:#CF0000"><xsl:value-of select="@type"/></span></xsl:when> 
          <xsl:when test="contains(@type,'TEXT')"><span style="color:#CF0000"><xsl:value-of select="@type"/></span></xsl:when>
          <xsl:when test="@type='SERIAL'"><b><span style="color:#007F3F">SERIAL</span></b></xsl:when>
          <xsl:when test="@type='INTEGER'"><span style="color:#007F3F">INTEGER</span></xsl:when>
          <xsl:when test="@type='INT4'"><span style="color:#007F3F">INTEGER</span></xsl:when>
          <xsl:when test="@type='SMALLINT'"><span style="color:#007F3F">SMALLINT</span></xsl:when>
          <xsl:when test="@type='INT2'"><span style="color:#007F3F">SMALLINT</span></xsl:when>
          <xsl:when test="@type='DOUBLE'"><span style="color:#007F00">DOUBLE</span></xsl:when>
          <xsl:when test="@type='FLOAT'"><span style="color:#007F00">FLOAT</span></xsl:when>
          <xsl:when test="@type='FLOAT8'"><span style="color:#007F00">FLOAT</span></xsl:when>
          <xsl:when test="contains(@type,'NUMERIC')"><span style="color:#007F00"><xsl:value-of select="@type"/></span></xsl:when>
          <xsl:when test="@type='BOOLEAN'"><span style="color:#007FFF">BOOLEAN</span></xsl:when>
          <xsl:when test="@type='BOOL'"><span style="color:#007FFF">BOOLEAN</span></xsl:when>
          <xsl:when test="@type='DATE'"><span style="color:#703000">DATE</span></xsl:when>
          <xsl:when test="@type='GEOMETRY'"><span style="color:#000000">GEOMETRY</span></xsl:when>
          <xsl:when test="@type='BYTEA'"><span style="color:#444444">BYTEA</span></xsl:when>
          <xsl:when test="@type='TIMESTAMP'"><span style="color:#707070">TIMESTAMP</span></xsl:when>
          <xsl:when test="contains(@type,'TIME')"><span style="color:#709070"><xsl:value-of select="@type"/></span></xsl:when>
          <!--<xsl:when test="@type=''"><span style="color:#0000FF"></span></xsl:when>-->
          <xsl:otherwise><blink><b>***<xsl:value-of select="@type"/>***</b></blink></xsl:otherwise>
        </xsl:choose>
        <!--(<xsl:value-of select="@type"/>)-->
      </td>
      <td>
        <xsl:if test="@notnull='true'">
          <span class="kw">⊗</span>
        </xsl:if>
      </td>
      <td>
        <xsl:if test="@default!=''">
<!--          <span class="kw">DEFAULT </span>-->
	  <xsl:variable name="apos">'</xsl:variable>
          <xsl:choose>
	    <xsl:when test="@default='NULL'"></xsl:when>
	    <xsl:when test="contains(@default,$apos)"><span style="color:#BC8F8F"><xsl:value-of select="@default"/></span></xsl:when>
            <xsl:when test="contains(@type,'BOOL')"><span style="color:#5F9EA0"><xsl:value-of select="@default"/></span></xsl:when>
	    <xsl:otherwise><xsl:value-of select="@default"/></xsl:otherwise>
	  </xsl:choose>
        </xsl:if>
      </td>

      <td>
<!--
        <xsl:if test="@notnull='true'">
          <span class="kw">NOT NULL </span>
        </xsl:if>
-->
        <xsl:if test="contains(@const,'UNIQUE')">
          <span class="kw">UNIQUE </span>
        </xsl:if>
        <xsl:if test="@pkey='true'">
          <span style="color:{$color_pk_fg}">PRIMARY KEY </span>
        </xsl:if>
        <xsl:if test="@fkey!=''">
	  <span class="kw">REF. </span>
          <a href="#{normalize-space(substring-before(@fkey,'('))}"><xsl:value-of select="normalize-space(substring-before(@fkey,'('))"/></a>(<a href="#{@fkey}"><xsl:value-of select="normalize-space(substring-before(substring-after(@fkey,'('),')'))"/></a><xsl:text>) </xsl:text>
<!--
	  <xsl:if test="@opt!=''">
	    <xsl:text> </xsl:text>
	    <xsl:value-of select="@opt"/>
	  </xsl:if>
-->
	  <xsl:if test="contains(@opt,'od')">
            <span class="kw small">
	      <xsl:text>DEL. </xsl:text>
	      <xsl:choose>
		<xsl:when test="contains(@opt,'odna')">NO ACTION</xsl:when>
		<xsl:when test="contains(@opt,'oda')" >NO ACTION</xsl:when>
		<xsl:when test="contains(@opt,'odr')" >RESTRICT</xsl:when>
		<xsl:when test="contains(@opt,'odc')" >CASCADE</xsl:when>
		<xsl:when test="contains(@opt,'odsn')">SET NULL</xsl:when>
		<xsl:when test="contains(@opt,'odn')" >SET NULL</xsl:when>
		<xsl:when test="contains(@opt,'odsd')">SET DEFAULT</xsl:when>
		<xsl:when test="contains(@opt,'odd')" >SET DEFAULT</xsl:when>
	      </xsl:choose>
	      <xsl:text> </xsl:text>
	    </span>
	  </xsl:if>
	  <xsl:if test="contains(@opt,'ou')">
            <span class="kw small">
	      <xsl:text>UPD. </xsl:text>
              <xsl:choose>
		<xsl:when test="contains(@opt,'ouna')">NO ACTION</xsl:when>
		<xsl:when test="contains(@opt,'oua')" >NO ACTION</xsl:when>
		<xsl:when test="contains(@opt,'our')" >RESTRICT</xsl:when>
		<xsl:when test="contains(@opt,'ouc')" >CASCADE</xsl:when>
		<xsl:when test="contains(@opt,'ousn')">SET NULL</xsl:when>
		<xsl:when test="contains(@opt,'oun')" >SET NULL</xsl:when>
		<xsl:when test="contains(@opt,'ousd')">SET DEFAULT</xsl:when>
		<xsl:when test="contains(@opt,'oud')" >SET DEFAULT</xsl:when>
	      </xsl:choose>
	    </span>
	  </xsl:if>
	  <xsl:if test="@option!=''"><xsl:value-of select="@option"/></xsl:if>
	</xsl:if>
      </td>
<!--      <td bgcolor="{$color_desc_bg}"><xsl:apply-templates name="bidon"/></td>-->
      <td><xsl:apply-templates name="bidon"/></td>
    </tr>
  </xsl:template>

  
  <xsl:template name="sql-color">
    <xsl:variable name="code"><xsl:value-of select="translate($sql,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/></xsl:variable>
    <xsl:choose>
      <xsl:when test="contains($code,'default')">
        <xsl:call-template name="sql-color">
          <xsl:with-param name="sql"><xsl:value-of select="substring($sql,0,string-length(substring-before($code,'default')))"/></xsl:with-param>
        </xsl:call-template>
        <span class="kw">DEFAULT</span>
        <xsl:call-template name="sql-color">
          <xsl:with-param name="sql"><xsl:value-of select="substring($sql,0,string-length(substring-before($code,'default')))"/></xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$code=''"/>
      <xsl:otherwise><xsl:value-of select="$sql"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="pkey">
    <tr class="pkey">
      <td colspan="5" rowspan="1" nowrap="yes">
        <span style="color:{$color_pk_fg}">PRIMARY KEY </span>
        <xsl:text>(</xsl:text>
 	<xsl:call-template name="key">
	  <xsl:with-param name="chaine"><xsl:value-of select="@keys"/></xsl:with-param>
	</xsl:call-template>
        <xsl:text>)</xsl:text>
      </td>
<!--      <td bgcolor="{$color_desc_bg}"><xsl:apply-templates name="bidon"/></td>-->
      <td><xsl:apply-templates name="bidon"/></td>
    </tr>
  </xsl:template>


  <xsl:template name="key">
    <xsl:param name="chaine">test</xsl:param>
    <xsl:choose>
      <xsl:when test="contains($chaine,',')">
        <a href="#{../@name}({normalize-space(substring-before($chaine,','))})">
	  <xsl:value-of select="normalize-space(substring-before($chaine,','))"/>
	</a><xsl:text>, </xsl:text>
        <xsl:call-template name="key">
	  <xsl:with-param name="chaine"><xsl:value-of select="substring-after($chaine,',')"/></xsl:with-param>
	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="string-length($chaine)>0">
         <a href="#{../@name}({normalize-space($chaine)})"><xsl:value-of select="normalize-space($chaine)"/></a>
	</xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="grant">
    <tr>
      <td align="right"><b><xsl:value-of select="@to"/></b></td>
      <td colspan="{number($nb_columns)-3}" rowspan="1" nowrap="yes"> est autorisé à effectuer 
        <b>
          <xsl:choose>
	    <xsl:when test="@priv='ALL'">toutes les opérations</xsl:when>
	    <xsl:otherwise><xsl:value-of select="@priv"/></xsl:otherwise>
	  </xsl:choose>
        </b>.
      </td>
      <td><xsl:apply-templates name="bidon"/></td>
    </tr>
  </xsl:template>


  <xsl:template match="revoke">
    <tr>
      <td align="right"><b><xsl:value-of select="@from"/></b></td>
      <td colspan="{number($nb_columns)-3}" rowspan="1" nowrap="yes"> est interdit d'effectuer 
        <b>
          <xsl:choose>
	    <xsl:when test="@priv='ALL'">toutes les opérations</xsl:when>
	    <xsl:otherwise><xsl:value-of select="@priv"/></xsl:otherwise>
	  </xsl:choose>
        </b>.
      </td>
      <td><xsl:apply-templates name="bidon"/></td>
    </tr>
  </xsl:template>


  <xsl:template match="rule">
    <tr>
      <td align="right"><b><xsl:text>RULE_</xsl:text>
        <xsl:value-of select="../@name"/>
        <xsl:text>_</xsl:text>
        <xsl:value-of select="@on"/></b>
      </td>
      <td colspan="{number($nb_columns)-3}" rowspan="1" nowrap="yes">
        <xsl:text> fait </xsl:text>
        <xsl:choose>
          <xsl:when test="@do=''"><xsl:text> rien du tout </xsl:text></xsl:when>
          <xsl:otherwise><b><xsl:value-of select="@do"/></b></xsl:otherwise>
        </xsl:choose>
        <xsl:if test="@where!=''">
          <xsl:text> quand </xsl:text>
          <b><xsl:value-of select="@where"/></b>
        </xsl:if>
        <xsl:text>.</xsl:text>        
      </td>
      <td><xsl:apply-templates name="bidon"/></td>
    </tr>
  </xsl:template>


  <xsl:template match="web">
    <xsl:choose>
      <xsl:when test="@name!=''"><a href="{@href}"><xsl:value-of select="@name"/></a></xsl:when>
      <xsl:otherwise><a href="{@href}"><xsl:value-of select="@href"/></a></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="lien">
    <xsl:choose>
      <xsl:when test="@name!=''"><a href="#{@href}"><xsl:value-of select="@name"/></a></xsl:when>
      <xsl:otherwise><a href="#{@href}"><xsl:value-of select="@href"/></a></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="itemize">
    <ul>
      <xsl:apply-templates select="item" mode="itemize"/>
    </ul>
  </xsl:template>
   <xsl:template match="description">
    <ul>
      <xsl:apply-templates select="item" mode="description"/>
    </ul>
  </xsl:template>

  <xsl:template match="item" mode="itemize"><li><xsl:apply-templates name="bidon"/></li></xsl:template>
  <xsl:template match="item" mode="description">
    <li class="nopuce">
      <b><xsl:value-of select="@text"/><xsl:text>  </xsl:text></b>  
      <xsl:apply-templates name="bidon"/>
    </li>
  </xsl:template>
 

  <xsl:template match="exp"><sup><xsl:value-of select="@x"/></sup></xsl:template>
  <xsl:template match="it"><i><xsl:value-of select="@text"/></i></xsl:template>
  <xsl:template match="bf"><b><xsl:value-of select="@text"/></b></xsl:template>
  <xsl:template match="tt"><tt><xsl:value-of select="@text"/></tt></xsl:template>

</xsl:stylesheet>
