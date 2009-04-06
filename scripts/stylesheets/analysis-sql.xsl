<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" omit-xml-declaration="yes" encoding="UTF-8"/>
  <xsl:variable name="majuscules">ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ</xsl:variable>
  <xsl:variable name="minuscules">abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþ</xsl:variable>
  <xsl:variable name="table_prefix">###_</xsl:variable>
  
  <xsl:template match="/">-- Introduction
    <xsl:text>/* </xsl:text>
    <xsl:value-of select="analysis/text"/>
    <xsl:text> */</xsl:text>

    <xsl:if test="contains($operation,'extra')">
      <xsl:text>
/* Ajout des colonnes supplémentaires */
BEGIN;
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="extra">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
      <xsl:text>
COMMIT;
</xsl:text>
    </xsl:if>


    <xsl:if test="contains($operation,'create')">
      <xsl:text>
/* Suppression des sequences */
</xsl:text>
      <xsl:apply-templates select="analysis/table/seq" mode="drop">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
      <xsl:text>
/* Suppression des contraintes foreign key */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column" mode="fkey-drop">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
    </xsl:if>
    <xsl:if test="contains($operation,'vues')">
      <xsl:text>
/* Suppression des vues */
</xsl:text>
<!--
      <xsl:apply-templates select="analysis/table" mode="drop-view">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
 -->
    </xsl:if>
    <xsl:if test="contains($operation,'create')">
      <xsl:text>
/* Suppression des tables */
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="drop">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
      <xsl:text>
/* Creation des sequences */
</xsl:text>
      <xsl:apply-templates select="analysis/table/seq" mode="create">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
      <xsl:text>
/* Creation des tables */
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="create">
        <xsl:sort select="@ordre+(@ordre=0)*99999"/>
      </xsl:apply-templates>
    </xsl:if>

    <xsl:if test="contains($operation,'fonctions')">
      <xsl:text>
/* Création des fonctions */
</xsl:text>
      <xsl:apply-templates select="analysis/table/function">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
    </xsl:if>


    <xsl:if test="contains($operation,'vues')">
      <xsl:text>
/* Creation des vues sur tables et des règles qui vont avec */
</xsl:text>
      <xsl:apply-templates select="analysis/table[not(@view='false')]" mode="create-view">
        <xsl:sort select="@ordre+(@ordre=0)*99999"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="analysis/table[not(@rules='false')]" mode="create-view-rules">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="analysis/table[not(@rules='false')]/rule[@sur='vue']" mode="create-rule">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
    </xsl:if>
    
    <xsl:if test="contains($operation,'regles')">
      <xsl:text>
/* Creation des règles */
</xsl:text>
      <xsl:apply-templates select="analysis/table/rule[not(@sur!='')]" mode="create-rule">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
    </xsl:if>



    <xsl:if test="contains($operation,'constraints')">
      <xsl:text>
/* Indexes */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column[@index='true']" mode="index">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="analysis/table/column[@fkey!='']" mode="index">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

      <xsl:text>
/* Primary keys */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column[@pkey='true']" mode="pkey">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

      <xsl:text>
/* Foreign keys */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column" mode="fkey">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

      <xsl:text>
/* Unique */
</xsl:text>
      <xsl:apply-templates select="analysis/table/unique" mode="create">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

      <xsl:text>
/* Default */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column[@default!='']" mode="default">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

      <xsl:text>
/* Not null */
</xsl:text>
      <xsl:apply-templates select="analysis/table/column[@notnull='true']" mode="notnull">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>

    </xsl:if>


<!--
    <xsl:text>

/* Revoke et Grant */
</xsl:text>
    <xsl:if test="contains($operation,'vues')">
      <xsl:text>
/*== Views */
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="view-revoke">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="analysis/table/grant" mode="view-grant">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
    </xsl:if>

    <xsl:if test="contains($operation,'create')">
      <xsl:text>
/*== Tables */
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="table-revoke">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
      <xsl:text>
/*== Séquences */
</xsl:text>
      <xsl:apply-templates select="analysis/table/seq/revoke">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="analysis/table/seq/grant">
        <xsl:sort select="../@name"/>
      </xsl:apply-templates>
    </xsl:if>
  -->
    <xsl:if test="contains($operation,'delete')">
      <xsl:text>
/* Nettoyage des tables */
</xsl:text>
      <xsl:apply-templates select="analysis/table" mode="delete">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
    </xsl:if>

  </xsl:template>



<!-- ========================================================================= -->



  <!-- TABLE -->
  <xsl:template match="table" mode="create">
    <xsl:text>CREATE TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
(
</xsl:text>
    <xsl:apply-templates select="column" mode="corps"/>
    <xsl:if test="count(pkey[@keys!=''])>0">
      <xsl:text>,
</xsl:text>
      <xsl:apply-templates select="pkey"/>
    </xsl:if>
    <xsl:text>
);

</xsl:text>
    <!-- On créé les fonctions et triggers rattachés -->
<!--
    <xsl:apply-templates select="function"/>
    <xsl:apply-templates select="trigger"/>
  -->
  </xsl:template>

  <xsl:template match="function">
    <xsl:text>CREATE OR REPLACE FUNCTION </xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>(</xsl:text>
    <xsl:value-of select="translate(@param,$majuscules,$minuscules)"/>
    <xsl:text>) RETURNS </xsl:text>
    <xsl:value-of select="translate(@returns,$majuscules,$minuscules)"/>
    <xsl:text> AS
$$</xsl:text>
    <xsl:value-of select="."/>
    <xsl:text>
$$ LANGUAGE 'plpgsql' VOLATILE;

</xsl:text>
  </xsl:template>

  <xsl:template match="trigger">
    <xsl:text>CREATE TRIGGER trigger_</xsl:text>
    <xsl:value-of select="../../@table"/>
    <xsl:value-of select="../@name"/>
    <xsl:text>_</xsl:text>
    <xsl:value-of select="@function"/>
    <xsl:text>_</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> </xsl:text>
    <xsl:value-of select="@execute"/>
    <xsl:text> ON </xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>
  FOR EACH </xsl:text>
    <xsl:value-of select="@foreach"/>
    <xsl:text> EXECUTE PROCEDURE </xsl:text>
    <xsl:value-of select="@function"/>
    <xsl:text>();

</xsl:text>
  </xsl:template>


  <xsl:template match="table" mode="drop">
    <xsl:text>DROP TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; CASCADE;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="delete">
    <xsl:text>DELETE FROM &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="revoke">
    <xsl:text>REVOKE ALL ON &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; FROM PUBLIC;
</xsl:text>
  </xsl:template>


  <xsl:template match="table" mode="create-view">
    <xsl:text>CREATE OR REPLACE VIEW &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; AS
   SELECT </xsl:text>
    <xsl:if test="@distinct='true'">
      <xsl:text>DISTINCT </xsl:text>
    </xsl:if>
    <xsl:if test="@distinct-on!=''">
      <xsl:text>DISTINCT ON (</xsl:text>
      <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>.</xsl:text>
      <xsl:value-of select="@distinct-on"/>
      <xsl:text>) </xsl:text>
    </xsl:if>
    <xsl:apply-templates select="column" mode="liste-declaration"/>
    <xsl:if test="@select!=''">
      <xsl:text>, </xsl:text>
      <xsl:call-template name="replace">
        <xsl:with-param name="ligne"><xsl:value-of select="@select"/></xsl:with-param>
        <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
        <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
      </xsl:call-template>

    </xsl:if>
    <xsl:text> 
     FROM &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;</xsl:text>
    <xsl:if test="@from!=''">
      <xsl:text> </xsl:text>
      <xsl:call-template name="replace">
        <xsl:with-param name="ligne"><xsl:value-of select="@from"/></xsl:with-param>
        <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
        <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
      </xsl:call-template>
<!--
      <xsl:if test="not(starts-with(@from,'LEFT OUTER JOIN'))">
        <xsl:text>, </xsl:text>
      </xsl:if>
      <xsl:call-template name="from-prefixe">
        <xsl:with-param name="from"><xsl:value-of select="@from"/></xsl:with-param>
      </xsl:call-template>
  -->
<!--      <xsl:value-of select="@from"/>-->
    </xsl:if>
    <xsl:if test="@where!=''">
      <xsl:text> 
    WHERE </xsl:text>
      <xsl:choose>
        <xsl:when test="contains(@where,'GROUP BY')">
          <xsl:call-template name="replace">
            <xsl:with-param name="ligne"><xsl:value-of select="substring-before(@where,'GROUP BY')"/></xsl:with-param>
            <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
            <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
          </xsl:call-template>
<!--          <xsl:value-of select="substring-before(@where,'GROUP BY')"/>-->
    <xsl:text>
 GROUP BY </xsl:text>
          <xsl:call-template name="replace">
            <xsl:with-param name="ligne"><xsl:value-of select="substring-after(@where,'GROUP BY')"/></xsl:with-param>
            <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
            <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
          </xsl:call-template>
<!--          <xsl:value-of select="substring-after(@where,'GROUP BY')"/>-->
          <xsl:if test="normalize-space(substring-after(@where,'GROUP BY'))!=''">
            <xsl:text>, </xsl:text>  
          </xsl:if>
          <xsl:apply-templates select="column" mode="liste"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="replace">
            <xsl:with-param name="ligne"><xsl:value-of select="@where"/></xsl:with-param>
            <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
            <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
          </xsl:call-template>
<!--          <xsl:value-of select="@where"/>-->
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
    <xsl:if test="@order!=''">
      <xsl:text>
    ORDER BY </xsl:text>
      <xsl:call-template name="replace">
        <xsl:with-param name="ligne"><xsl:value-of select="@order"/></xsl:with-param>
        <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
        <xsl:with-param name="objet"><xsl:value-of select="../@table"/></xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:text>;

</xsl:text>
  </xsl:template>

  <xsl:template name="from-prefixe">
    <xsl:if test="normalize-space($from)!=''">
      <!--<xsl:value-of select="/analysis/@table"/>-->
      <xsl:choose>
        <xsl:when test="contains($from,'LEFT OUTER JOIN')">
          <xsl:text> LEFT OUTER JOIN </xsl:text>
    <xsl:if test="not(starts-with(normalize-space(substring-after($from,'LEFT OUTER JOIN')),'('))">
            <xsl:value-of select="/analysis/@table"/>
          </xsl:if>
    <xsl:variable name="delim">
        <xsl:choose>
        <xsl:when test="contains(substring-after($from,'LEFT OUTER JOIN'),'$|$')">$|$</xsl:when>
        <xsl:otherwise>)</xsl:otherwise>
      </xsl:choose>
          </xsl:variable>
          <xsl:value-of select="normalize-space(substring-before(substring-after($from,'LEFT OUTER JOIN'),$delim))"/>
    <xsl:if test="not(contains(substring-after($from,'LEFT OUTER JOIN'),'$|$'))">
            <xsl:text>)</xsl:text>
    </xsl:if>
          <xsl:if test="normalize-space(substring-after($from,$delim))!=''">
            <xsl:call-template name="from-prefixe">
              <xsl:with-param name="from"><xsl:value-of select="substring-after($from,$delim)"/></xsl:with-param>
            </xsl:call-template>      
          </xsl:if>
        </xsl:when>
        <xsl:when test="contains($from,',')">
    <xsl:if test="normalize-space(substring-before($from,','))!=''">
            <xsl:if test="not(starts-with(normalize-space(substring-after($from,',')),'('))">
              <xsl:value-of select="/analysis/@table"/>
            </xsl:if>
<!--            <xsl:value-of select="/analysis/@table"/>-->
            <xsl:value-of select="normalize-space(substring-before($from,','))"/>
          </xsl:if>
          <xsl:if test="normalize-space(substring-after($from,','))!=''">
            <xsl:text>, </xsl:text>
            <xsl:call-template name="from-prefixe">
              <xsl:with-param name="from"><xsl:value-of select="substring-after($from,',')"/></xsl:with-param>
            </xsl:call-template>      
          </xsl:if>
        </xsl:when>
  <xsl:when test="not($from!='')"/>
  <xsl:otherwise>
          <xsl:value-of select="/analysis/@table"/>
          <xsl:value-of select="normalize-space($from)"/>
  </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>

  <xsl:template match="table" mode="drop-view">
    <xsl:text>DROP VIEW &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; CASCADE;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="view-revoke">
    <xsl:text>REVOKE ALL ON &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; FROM PUBLIC;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="extra">
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ALTER updated_by SET DEFAULT CURRENT_USER;
</xsl:text>
<!--
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD id SERIAL NOT NULL UNIQUE;
</xsl:text>
    <xsl:if test="count(column[@name='update_time'])">
      <xsl:text>ALTER TABLE &#34;</xsl:text>
      <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34; DROP COLUMN update_time;
</xsl:text>
    </xsl:if>
    <xsl:if test="count(column[@name='update_user'])">
      <xsl:text>ALTER TABLE &#34;</xsl:text>
      <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34; DROP COLUMN update_user;
</xsl:text>
    </xsl:if>
    -->
<!--
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD created_at TIMESTAMP;
</xsl:text>
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD created_by VARCHAR(32);
</xsl:text>
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD updated_at TIMESTAMP;
</xsl:text>
    <xsl:if test="count(column[@name='update_time'])">
      <xsl:text>UPDATE &#34;</xsl:text>
      <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34; SET updated_at=update_time;
</xsl:text>
    </xsl:if>
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD updated_by VARCHAR(32);
</xsl:text>
    <xsl:if test="count(column[@name='update_user'])">
      <xsl:text>UPDATE &#34;</xsl:text>
      <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34; SET updated_by=update_user;
</xsl:text>
    </xsl:if>
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ADD lock_version INTEGER DEFAULT 0;
</xsl:text>
  -->
  </xsl:template>


  <xsl:template match="grant" mode="view-grant">
    <xsl:text>GRANT </xsl:text>
    <xsl:value-of select="@priv"/>
    <xsl:text> ON &#34;</xsl:text>
    <xsl:value-of select="translate(../../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; TO </xsl:text>
    <xsl:value-of select="@to"/>
    <xsl:text>;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="table-revoke">
    <xsl:text>REVOKE ALL ON &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; FROM PUBLIC;
</xsl:text>
  </xsl:template>

  <xsl:template match="table" mode="create-view-rules">
    <xsl:text>CREATE OR REPLACE RULE rule_</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>_insert AS
  ON INSERT TO &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
  DO INSTEAD INSERT INTO &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;(</xsl:text>
    <xsl:apply-templates select="column" mode="liste-x">
      <xsl:with-param name="left">false</xsl:with-param>
      <xsl:with-param name="prefixe"></xsl:with-param>
    </xsl:apply-templates>
    <xsl:text>) VALUES (</xsl:text>
    <xsl:apply-templates select="column" mode="replace-default">
      <xsl:with-param name="mode">insert</xsl:with-param>
    </xsl:apply-templates>
<!--
    <xsl:apply-templates select="column" mode="liste-x">
      <xsl:with-param name="left">false</xsl:with-param>
      <xsl:with-param name="prefixe">new.</xsl:with-param>
    </xsl:apply-templates>
  -->
    <xsl:text>);
</xsl:text>
    <xsl:text>CREATE OR REPLACE RULE rule_</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>_update AS
  ON UPDATE TO &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
  DO INSTEAD UPDATE &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; SET </xsl:text>
    <xsl:apply-templates select="column" mode="replace-default">
      <xsl:with-param name="mode">update</xsl:with-param>
    </xsl:apply-templates>
<!--
    <xsl:apply-templates select="column" mode="liste-x">
      <xsl:with-param name="left">true</xsl:with-param>
      <xsl:with-param name="prefixe">=new.</xsl:with-param>
    </xsl:apply-templates>
  -->
    <xsl:text> WHERE </xsl:text>
    <xsl:call-template name="pkey-egal">
      <xsl:with-param name="prefixe">new</xsl:with-param>
    </xsl:call-template>
    <xsl:text>;
</xsl:text>
    <xsl:text>CREATE OR REPLACE RULE rule_</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>_delete AS
  ON DELETE TO &#34;</xsl:text>
    <xsl:value-of select="translate(../@view,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
  DO INSTEAD DELETE FROM &#34;</xsl:text>
    <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; WHERE </xsl:text>
    <xsl:call-template name="pkey-egal">
      <xsl:with-param name="prefixe">old</xsl:with-param>
    </xsl:call-template>
    <xsl:text>;

</xsl:text>
  </xsl:template>

  <xsl:template name="pkey-egal">
    <xsl:param name="prefixe"></xsl:param>
    <xsl:choose>
      <xsl:when test="count(pkey)>0">
        <xsl:call-template name="pkey-liste-egal">
    <xsl:with-param name="keys"><xsl:value-of select="pkey/@keys"/></xsl:with-param>
    <xsl:with-param name="prefixe"><xsl:value-of select="$prefixe"/></xsl:with-param>
  </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$prefixe"/>.<xsl:value-of select="column[@pkey='true']/@name"/>=<xsl:value-of select="column[@pkey='true']/@name"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="pkey-liste-egal">
    <xsl:param name="keys"></xsl:param>
    <xsl:param name="prefixe"></xsl:param>
    <xsl:if test="normalize-space($keys)!=''">
      <xsl:choose>
        <xsl:when test="contains($keys,',')">
    <xsl:value-of select="$prefixe"/>
    <xsl:text>.</xsl:text>
          <xsl:value-of select="normalize-space(substring-before($keys,','))"/>
    <xsl:text>=</xsl:text>
          <xsl:value-of select="normalize-space(substring-before($keys,','))"/>
          <xsl:if test="normalize-space(substring-after($keys,','))!=''">
            <xsl:text> AND </xsl:text>
            <xsl:call-template name="pkey-liste-egal">
              <xsl:with-param name="keys"><xsl:value-of select="substring-after($keys,',')"/></xsl:with-param>
              <xsl:with-param name="prefixe"><xsl:value-of select="$prefixe"/></xsl:with-param>
            </xsl:call-template>      
          </xsl:if>
        </xsl:when>
  <xsl:otherwise>
    <xsl:value-of select="$prefixe"/>
    <xsl:text>.</xsl:text>
          <xsl:value-of select="normalize-space($keys)"/>
    <xsl:text>=</xsl:text>
          <xsl:value-of select="normalize-space($keys)"/>
  </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>



  <!-- RULE -->
  <xsl:template match="rule" mode="create-rule">
    <xsl:variable name="prefixe">
      <xsl:choose>
        <xsl:when test="@sur='vue'"><xsl:value-of select="../../@view"/></xsl:when>
        <xsl:otherwise><xsl:value-of select="../../@table"/></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:text>CREATE OR REPLACE RULE rule_</xsl:text>
    <xsl:value-of select="$prefixe"/>
    <xsl:value-of select="../@name"/>
    <xsl:text>_</xsl:text>
    <xsl:value-of select="@on"/>
    <xsl:if test="@sur!='vue'">
      <xsl:text>_</xsl:text>
      <xsl:value-of select="position()"/>
    </xsl:if>
    <xsl:text> AS
  ON </xsl:text>
    <xsl:value-of select="@on"/>
    <xsl:text> TO </xsl:text>
    <xsl:value-of select="$prefixe"/>
    <xsl:value-of select="../@name"/>
    <xsl:if test="@where!=''">
      <xsl:text> WHERE </xsl:text>
      <xsl:value-of select="@where"/>
    </xsl:if>
    <xsl:text>
  DO </xsl:text>
    <xsl:if test="not(@instead!='') or @instead='true'">
      <xsl:text>INSTEAD </xsl:text>
    </xsl:if>
    <xsl:choose>
      <xsl:when test="not(@do!='')"><xsl:text>NOTHING</xsl:text></xsl:when>
      <xsl:otherwise>
        <xsl:text>(</xsl:text>
        <xsl:call-template name="replace">
          <xsl:with-param name="ligne"><xsl:value-of select="@do"/></xsl:with-param>
          <xsl:with-param name="motif"><xsl:value-of select="$table_prefix"/></xsl:with-param>
          <xsl:with-param name="objet"><xsl:value-of select="../../@table"/></xsl:with-param>
        </xsl:call-template>
        <xsl:text>)</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:text>;

</xsl:text>
  </xsl:template>

  <xsl:template name="clean-condition">
    <xsl:choose>
      <xsl:when test="contains($condition,'!=')">
        <xsl:call-template name="clean-condition">
          <xsl:with-param name="condition"><xsl:value-of select="substring-before($condition,'!=')"/></xsl:with-param>
        </xsl:call-template>
        <![CDATA[<>]]>
        <xsl:call-template name="clean-condition">
          <xsl:with-param name="condition"><xsl:value-of select="substring-after($condition,'!=')"/></xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="$condition"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- SEQUENCE -->
  <xsl:template match="seq" mode="drop">
    <xsl:text>DROP SEQUENCE &#34;</xsl:text><xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; CASCADE;
</xsl:text>
  </xsl:template>

  <xsl:template match="seq" mode="create">
    <xsl:text>CREATE SEQUENCE &#34;</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;</xsl:text>
    <xsl:if test="@start!=''"> START <xsl:value-of select="@start"/></xsl:if>
    <xsl:text>;
</xsl:text>
  </xsl:template>


  <!-- COLUMN -->
  <xsl:template match="column" mode="liste">
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>.</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:if test="position()!=last()">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="column" mode="liste-declaration">
    <xsl:choose>
      <xsl:when test="contains(@type,'NUMERIC')">
        <xsl:text>ROUND(</xsl:text>
        <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
        <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
        <xsl:text>.</xsl:text>
        <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
        <xsl:text>,</xsl:text>
        <xsl:choose>
          <xsl:when test="contains(@type,',')"><xsl:value-of select="substring-before(substring-after(@type,','),')')"/></xsl:when>
          <xsl:otherwise>2</xsl:otherwise>
        </xsl:choose>
        <xsl:text>) AS </xsl:text>
        <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
        <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
        <xsl:text>.</xsl:text>
        <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:if test="position()!=last()">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="column" mode="liste-x">
    <xsl:param name="left">false</xsl:param>
    <xsl:param name="prefixe"></xsl:param>
    <xsl:if test="$left='true'">
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    </xsl:if>
    <xsl:value-of select="$prefixe"/>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:if test="position()!=last()">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="column" mode="replace-default">
    <xsl:param name="mode">update</xsl:param>
    <xsl:if test="$mode='update'">
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>=</xsl:text>
    </xsl:if>
    <xsl:choose>
      <xsl:when test="contains(@type,'NUMERIC')">
        <xsl:text>ROUND(</xsl:text>
      </xsl:when>
      <xsl:otherwise/>
    </xsl:choose>

    <xsl:choose>
      <xsl:when test="@name='date_creation'"><xsl:text>CURRENT_TIMESTAMP</xsl:text></xsl:when>
      <xsl:when test="@name='update_time'"><xsl:text>CURRENT_TIMESTAMP</xsl:text></xsl:when>
      <xsl:when test="@name='update_user'"><xsl:text>CURRENT_USER</xsl:text></xsl:when>
      <xsl:when test="@name='updated_at'"><xsl:text>CURRENT_TIMESTAMP</xsl:text></xsl:when>
      <xsl:when test="@name='updated_on'"><xsl:text>CURRENT_DATE</xsl:text></xsl:when>
      <xsl:when test="@name='updated_by'"><xsl:text>CURRENT_USER</xsl:text></xsl:when>

      <xsl:when test="(@name='id' or translate(substring(@name,string-length(@name)-2,string-length(@name)-1),$majuscules,$minuscules)='_id') and $mode='update'"><xsl:text>OLD.</xsl:text><xsl:value-of select="@name"/></xsl:when>
      <xsl:when test="@name='lock_version' and $mode='update'"><xsl:text>OLD.lock_version+1</xsl:text></xsl:when>
      <xsl:when test="@name='created_at' and $mode='update'"><xsl:text>OLD.created_at</xsl:text></xsl:when>
      <xsl:when test="@name='created_on' and $mode='update'"><xsl:text>OLD.created_on</xsl:text></xsl:when>
      <xsl:when test="@name='created_by' and $mode='update'"><xsl:text>OLD.created_by</xsl:text></xsl:when>

      <xsl:when test="(@name='id' or translate(substring(@name,string-length(@name)-2,string-length(@name)-1),$majuscules,$minuscules)='_id') and $mode!='update'"><xsl:text>DEFAULT</xsl:text></xsl:when>
      <xsl:when test="@name='lock_version' and $mode!='update'"><xsl:text>0</xsl:text></xsl:when>
      <xsl:when test="@name='created_at' and $mode!='update'"><xsl:text>CURRENT_TIMESTAMP</xsl:text></xsl:when>
      <xsl:when test="@name='created_on' and $mode!='update'"><xsl:text>CURRENT_DATE</xsl:text></xsl:when>
      <xsl:when test="@name='created_by' and $mode!='update'"><xsl:text>CURRENT_USER</xsl:text></xsl:when>
<!--      <xsl:when test="contains(@type,'SERIAL') and @notnull='true'"><xsl:text>COALESCE(NEW.</xsl:text><xsl:value-of select="translate(@name,$majuscules,$minuscules)"/><xsl:text>, DEFAULT)</xsl:text></xsl:when>-->
      <xsl:when test="@default!='' and @default!='NULL'">
        <xsl:text>COALESCE(NEW.</xsl:text>
        <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
  <xsl:text>,</xsl:text>
  <xsl:value-of select="@default"/>
  <xsl:text>)</xsl:text>
<!--
        <xsl:text>CASE WHEN new.</xsl:text>
  <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
  <xsl:text> IS NULL THEN </xsl:text>
  <xsl:value-of select="@default"/>
  <xsl:text> ELSE new.</xsl:text>
  <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
  <xsl:text> END</xsl:text>
  -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>new.</xsl:text>
  <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      </xsl:otherwise>
    </xsl:choose>


    <xsl:choose>
      <xsl:when test="contains(@type,'NUMERIC')">
        <xsl:text>,</xsl:text>
        <xsl:choose>
          <xsl:when test="contains(@type,',')"><xsl:value-of select="substring-before(substring-after(@type,','),')')"/></xsl:when>
          <xsl:otherwise>2</xsl:otherwise>
        </xsl:choose>
        <xsl:text>)</xsl:text>
      </xsl:when>
      <xsl:otherwise/>
    </xsl:choose>


    <xsl:if test="position()!=last()">
      <xsl:text>, </xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="column" mode="corps">
    <xsl:text>  &#34;</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; </xsl:text>
    <xsl:value-of select="@type"/>
    <xsl:if test="@const!=''">
      <xsl:text> </xsl:text>
      <xsl:value-of select="@const"/>
    </xsl:if>
    <xsl:if test="position()!=last()"><xsl:text>,
</xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="column" mode="fkey">
    <xsl:if test="@fkey!=''">
      <xsl:text>ALTER TABLE &#34;</xsl:text>
      <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34;
  ADD CONSTRAINT fk_</xsl:text>
      <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
      <xsl:text>_</xsl:text>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
      <xsl:text>
  FOREIGN KEY (</xsl:text>
      <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>) REFERENCES <xsl:value-of select="../../@table"/>
      <xsl:value-of select="@fkey"/>
      <xsl:if test="contains(@opt,'od')">
        <xsl:text>
    ON DELETE </xsl:text>
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
        <xsl:if test="contains(@opt,'ou')">
          <xsl:text> </xsl:text>
        </xsl:if>
      </xsl:if>
      <xsl:if test="contains(@opt,'ou')">
        <xsl:text>
    ON UPDATE </xsl:text>
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
      </xsl:if>
      <xsl:if test="@option!=''">
        <xsl:text> </xsl:text>
        <xsl:value-of select="@option"/>
      </xsl:if>
      <xsl:text>;
</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="column" mode="fkey-drop">
    <xsl:if test="@fkey!=''">
      <xsl:text>ALTER TABLE &#34;</xsl:text>
      <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
      <xsl:text>&#34;
  DROP CONSTRAINT fk_</xsl:text>
      <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
      <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>_<xsl:value-of select="translate(@name,$majuscules,$minuscules)"/><xsl:text>;
</xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="unique" mode="create">
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
  ADD CONSTRAINT unique_</xsl:text>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>_<xsl:value-of select="position()"/>
    <xsl:text> 
    UNIQUE (</xsl:text>
    <xsl:value-of select="@keys"/>
      <xsl:text>);
</xsl:text>
  </xsl:template>

  <xsl:template match="column" mode="index">
    <xsl:text>CREATE INDEX idx_</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>_<xsl:value-of select="translate(@name,$majuscules,$minuscules)"/> ON <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>(<xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>);
</xsl:text>
  </xsl:template>

  <xsl:template match="column" mode="pkey">
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34;
  ADD CONSTRAINT pk_</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>_<xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text> PRIMARY KEY (</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>);
</xsl:text>
  </xsl:template>

  <xsl:template match="column" mode="default">
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ALTER &#34;</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; SET DEFAULT </xsl:text>
    <xsl:value-of select="@default"/>
    <xsl:text>;
</xsl:text>
  </xsl:template>

  <xsl:template match="column" mode="notnull">
    <xsl:text>ALTER TABLE &#34;</xsl:text>
    <xsl:value-of select="translate(../../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; ALTER &#34;</xsl:text>
    <xsl:value-of select="translate(@name,$majuscules,$minuscules)"/>
    <xsl:text>&#34; SET NOT NULL </xsl:text>
    <xsl:text>;
</xsl:text>
  </xsl:template>




<!--  Autre    -->

  <xsl:template match="pkey">
    <xsl:text>  PRIMARY KEY (</xsl:text>
    <xsl:value-of select="@keys"/>
    <xsl:text>)</xsl:text>
    <xsl:if test="position()!=last()">
      <xsl:text>,
</xsl:text>
    </xsl:if>
  </xsl:template>


  <xsl:template match="grant">
    <xsl:text>GRANT </xsl:text>
    <xsl:value-of select="@priv"/> ON <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
    <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/> TO <xsl:value-of select="@to"/><xsl:text>;
</xsl:text>
  </xsl:template>

  <xsl:template match="revoke">REVOKE <xsl:value-of select="@priv"/> ON <xsl:value-of select="translate(../@table,$majuscules,$minuscules)"/>
  <xsl:value-of select="translate(../@name,$majuscules,$minuscules)"/> FROM <xsl:value-of select="@from"/><xsl:text>;
</xsl:text>
  </xsl:template>


	<xsl:template name="replace">
		<xsl:param name="ligne"/>
    <xsl:param name="motif"> </xsl:param>
    <xsl:param name="objet"/>
		<xsl:if test="not(contains($ligne,$motif))"><xsl:value-of select="$ligne"/></xsl:if>
		<xsl:if test="contains($ligne,$motif)">
			<xsl:value-of select="substring-before($ligne,$motif)"/>
			<xsl:value-of select="$objet"/>
			<xsl:call-template name="replace">
				<xsl:with-param name="ligne"><xsl:value-of select="substring-after($ligne,$motif)"/></xsl:with-param>
				<xsl:with-param name="motif"><xsl:value-of select="$motif"/></xsl:with-param>
				<xsl:with-param name="objet"><xsl:value-of select="$objet"/></xsl:with-param>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>


</xsl:stylesheet>
