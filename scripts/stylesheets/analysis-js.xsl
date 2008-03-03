<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="text" omit-xml-declaration="yes" encoding="iso-8859-1" indent="yes"/>

  <xsl:template match="/">/* Constantes de types */
const TYPE_UNKNOWN       = -1;
const TYPE_UNDEFINED     = 0;
const TYPE_STRING        = 1;
const TYPE_INT           = 2;
const TYPE_FLOAT         = 3;
const TYPE_DECIMAL       = 4;
const TYPE_DATE	         = 5;
const TYPE_TIME          = 6;
const TYPE_DATETIME      = 7;
const TYPE_BOOL          = 8;
const TYPE_GEOMETRY      = 9;

/*
Les fonctions renvoient des chaines avec Majuscules

function mcd_getType(table,champs);
function mcd_obligatoire(table,champs);
function mcd_getTables();
function mcd_getTablesLabel();
function mcd_getChampsLogique(table);
function mcd_getChampsLabel(table);
function mcd_getMinChampsLogique(table);
function mcd_getMinChampsLabel(table);
function mcd_getLiens();
function mcd_getTablesCouleur();
function mcd_getTablesNote();
*/

/* Renvoie le type d'un attribut */
function mcd_getType(table,champs)
{
  var type;
  switch(table.toLowerCase()){
  <xsl:apply-templates select="analysis/table" mode="gettype">
    <xsl:sort select="@name"/>
  </xsl:apply-templates>
    default: 
      type=TYPE_UNDEFINED;
      try{type=gsea_getType(table,champs);} 
      catch(e){type=TYPE_UNDEFINED;};
  }
  return type;
}

/* Renvoie le label d'un attribut */
function mcd_getLabel(table,champs)
{
  var label;
  switch(table.toLowerCase()){
  <xsl:apply-templates select="analysis/table" mode="getlabel">
    <xsl:sort select="@name"/>
  </xsl:apply-templates>
    default: label="";
  }
  return label;
}

/* Renvoie si c'est obligatoire de renseigner le champs */
function mcd_obligatoire(table,champs)
{
  var obligatoire;
  switch(table.toLowerCase()){
  <xsl:apply-templates select="analysis/table" mode="obligatoire">
    <xsl:sort select="@name"/>
  </xsl:apply-templates>
    default: 
      obligatoire=false;
      try{obligatoire=gsea_obligatoire(table,champs);}
      catch(e) {obligatoire=false;}
  }
  return obligatoire;
}

/* Renvoie la clé primaire de la table*/
function mcd_getCle(table)
{
  var champs;
  switch(table.toLowerCase()){
  <xsl:apply-templates select="analysis/table" mode="getcle">
    <xsl:sort select="@name"/>
  </xsl:apply-templates>
    default: return null;
  }
  return champs.toLowerCase();
}


/* Renvoie la séquence de la clé primaire de la table */
function mcd_getSequence(t) {
  var s;
  switch(t.toLowerCase()){
  <xsl:apply-templates select="analysis/table" mode="getsequence">
    <xsl:sort select="@name"/>
  </xsl:apply-templates>
    default: s = null;
  }
  return s;
}




  </xsl:template>

  <xsl:template name="minuscule">
    <xsl:value-of select="translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
  </xsl:template>

  <xsl:template match="table" mode="req">
  <xsl:text>  case '</xsl:text><xsl:call-template name="minuscule"/>':
      return '<xsl:value-of select="column[@name='couleur']/@req"/>';
      break;
  </xsl:template>


  <xsl:template match="table" mode="double">
  tab[0].push("<xsl:value-of select="@label"/>");
  tab[1].push('<xsl:value-of select="@name"/>');</xsl:template>


  <!-- getLiens -->
  <xsl:template match="table" mode="lien">
    <xsl:apply-templates select="column[@fkey!='']" mode="lien"/>
  </xsl:template>

  <xsl:template match="column" mode="lien">
  liens[0].push('<xsl:value-of select="../@name"/>.<xsl:value-of select="@name"/>');
  liens[1].push('<xsl:value-of select="substring-before(@fkey,'(')"/>.<xsl:value-of select="substring-before(substring-after(@fkey,'('),')')"/>');</xsl:template>


  <!-- getType  -->
  <xsl:template match="table" mode="gettype">
  <xsl:text>  case 'table_</xsl:text><xsl:call-template name="minuscule"/><xsl:text>':
    case '</xsl:text><xsl:call-template name="minuscule"/>':
      switch(champs.toLowerCase()){<xsl:apply-templates select="column" mode="gettype"/>
        default: type=TYPE_UNDEFINED;
      }
      break;
  </xsl:template>

  <xsl:template match="column" mode="gettype">
        case '<xsl:call-template name="minuscule"/><xsl:text>': type=</xsl:text>
    <xsl:choose>
      <xsl:when test="contains(@type,'VARCHAR')">TYPE_STRING</xsl:when>
      <xsl:when test="contains(@type,'CHAR')">TYPE_STRING</xsl:when>
      <xsl:when test="@type='TEXT'">TYPE_STRING</xsl:when>
      <xsl:when test="@type='INTEGER'">TYPE_INT</xsl:when>
      <xsl:when test="@type='INT4'">TYPE_INT</xsl:when>
      <xsl:when test="@type='FLOAT'">TYPE_FLOAT</xsl:when>
      <xsl:when test="@type='FLOAT8'">TYPE_FLOAT</xsl:when>
      <xsl:when test="contains(@type,'NUMERIC')">TYPE_FLOAT</xsl:when>
      <xsl:when test="@type='BOOLEAN'">TYPE_BOOL</xsl:when>
      <xsl:when test="@type='BOOL'">TYPE_BOOL</xsl:when>
      <xsl:when test="@type='DATE'">TYPE_DATE</xsl:when>
      <xsl:when test="@type='GEOMETRY'">TYPE_GEOMETRY</xsl:when>
      <xsl:when test="@type='TIMESTAMP'">TYPE_DATETIME</xsl:when>
      <xsl:otherwise>TYPE_UNKNOWN</xsl:otherwise>
    </xsl:choose><xsl:text>;break;</xsl:text>
  </xsl:template>

  <!-- getLabel  -->
  <xsl:template match="table" mode="getlabel">
  <xsl:text>  case 'table_</xsl:text><xsl:call-template name="minuscule"/><xsl:text>':
    case '</xsl:text><xsl:call-template name="minuscule"/>':
      switch(champs.toLowerCase()){<xsl:apply-templates select="column" mode="getlabel"/>
        default: label="";
      }
      break;
  </xsl:template>

  <xsl:template match="column" mode="getlabel">
        case '<xsl:call-template name="minuscule"/>
    <xsl:text>': label="</xsl:text>
    <xsl:value-of select="@label"/>
    <xsl:text>";break;</xsl:text>
  </xsl:template>

  <!-- obligatoire  -->
  <xsl:template match="table" mode="obligatoire">
  <xsl:text>  case 'table_</xsl:text><xsl:call-template name="minuscule"/><xsl:text>':
    case '</xsl:text><xsl:call-template name="minuscule"/>':
      switch(champs.toLowerCase()){<xsl:apply-templates select="column" mode="obligatoire"/>
        default: obligatoire=false;
      }
      break;
  </xsl:template>

  <xsl:template match="column" mode="obligatoire">
        case '<xsl:call-template name="minuscule"/><xsl:text>': obligatoire=</xsl:text>
    <xsl:choose>
      <xsl:when test="@notnull='true'">true</xsl:when>
      <xsl:when test="@pkey='true'">true</xsl:when>
      <xsl:otherwise>false</xsl:otherwise>
    </xsl:choose><xsl:text>;break;</xsl:text>
  </xsl:template>

  <!-- getCle  -->
  <xsl:template match="table" mode="getcle">
    <xsl:text>    case '</xsl:text>
    <xsl:value-of select="../@table"/>
    <xsl:call-template name="minuscule"/>
    <xsl:text>': 
    case '</xsl:text>
    <xsl:value-of select="../@view"/>
    <xsl:call-template name="minuscule"/>
    <xsl:text>': champs=</xsl:text>
    <xsl:choose>
      <xsl:when test="count(pkey)!=0">''</xsl:when>
      <xsl:when test="count(column[@pkey='true'])=1">'<xsl:value-of select="column[@pkey='true']/@name"/>'</xsl:when>
    </xsl:choose>
    <xsl:text>;break;
</xsl:text>
  </xsl:template>


  <!-- getSequence -->
  <xsl:template match="table" mode="getsequence">
    <xsl:text>    case '</xsl:text>
    <xsl:value-of select="../@table"/>
    <xsl:call-template name="minuscule"/>
    <xsl:text>': case '</xsl:text>
    <xsl:value-of select="../@view"/>
    <xsl:call-template name="minuscule"/>
    <xsl:text>': s=</xsl:text>
    <xsl:choose>
      <xsl:when test="count(pkey)!=0">'#'</xsl:when>
      <xsl:when test="count(column[@pkey='true' and contains(@type,'SERIAL')])=1">'*'</xsl:when>
      <xsl:when test="count(column[@pkey='true'])=1 and count(seq)=1">'<xsl:value-of select="seq/@name"/>'</xsl:when>
      <xsl:otherwise>null</xsl:otherwise>
    </xsl:choose>
    <xsl:text>;break;
</xsl:text>
  </xsl:template>


  <!-- getTables  -->
  <xsl:template match="table" mode="gettables">
  tab.push("<xsl:choose>
       <xsl:when test="$type='nom'"><xsl:value-of select="@name"/></xsl:when>
       <xsl:when test="$type='label'"><xsl:value-of select="@label"/></xsl:when>
     </xsl:choose>");</xsl:template>


  <!-- getChamps  -->
  <xsl:template match="table" mode="getchamps">
  <xsl:text>    case '</xsl:text><xsl:call-template name="minuscule"/>':
<!--<xsl:apply-templates select="column[@name!='date_creation' and substring-after(@name,'_')!='Numero']" mode="getchamps">-->
<xsl:apply-templates select="column[@name!='date_creation']" mode="getchamps">
      <xsl:with-param name="type"><xsl:value-of select="$type"/></xsl:with-param>
      <xsl:sort select="@name"/>
    </xsl:apply-templates>
    <xsl:text>      break;
</xsl:text>
  </xsl:template>

  <xsl:template match="column" mode="getchamps">
    <xsl:text>      tab.push("</xsl:text>
    <xsl:choose>
      <xsl:when test="$type='nom'"><xsl:value-of select="@name"/></xsl:when>
      <xsl:when test="$type='label'"><xsl:value-of select="@label"/></xsl:when>
      <xsl:when test="$type='type'"><xsl:value-of select="@type"/></xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
    <xsl:text>");
</xsl:text>
  </xsl:template>

  <!-- getMinChamps  -->
  <xsl:template match="table" mode="getminchamps">
  <xsl:text>    case '</xsl:text><xsl:call-template name="minuscule"/>':
<xsl:apply-templates select="column[@name!='date_creation' and @name!='couleur' and @name!='note' and not(@fkey!='') and @pkey!='true']" mode="getchamps">
      <xsl:with-param name="type"><xsl:value-of select="$type"/></xsl:with-param>
      <xsl:sort select="@name"/>
    </xsl:apply-templates>
    <xsl:text>      break;
</xsl:text>
  </xsl:template>


</xsl:stylesheet>
