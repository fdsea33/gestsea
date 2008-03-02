<?xml version="1.0" encoding="ISO-8859-1"?>
<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>
<?xml-stylesheet href="chrome://browser/skin/" type="text/css"?>
<?xml-stylesheet href="chrome://gestsea/skin/icons.css" type="text/css"?>
<!-- CE FICHIER A ETE GENERE PAR GENERATOR_LIB -->

<window windowtype="gestsea:personne" name="personne" sizemode="maximized" 
	id="Page_personne"
	title="GestSEA Personne"
	orient="vertical"
	onload="personne_Chargement();"
	xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">

<!-- FICHIERS DE SCRIPTS NECESSAIRES -->

<script src="chrome://gestsea/content/generator/pgsql.js"/>
<script src="chrome://gestsea/content/generator/utils_xul.js"/>
<script src="chrome://gestsea/content/generator/pointer.js"/>
<script src="chrome://gestsea/content/generator/generator_sql.js"/>
<script src="chrome://gestsea/content/generator/generator_xul.js"/>
<script src="chrome://global/content/nsDragAndDrop.js"/>
<script src="chrome://global/content/nsTransferable.js"/>
<script src="chrome://global/content/globalOverlay.js"/>
<script src="chrome://browser/content/browser.js"/>
<script src="chrome://gestsea/content/gestsea/principal_plus.js"/>
<script src="chrome://gestsea/content/gestsea/export.js"/>
<script src="chrome://gestsea/content/generator/libIO.js"/>
<script src="chrome://gestsea/content/generator/gestsea-mcd.js"/>
<!-- AJOUTER chrome://agrisig/content/Onglets/Agrisig SI NECESSAIRE -->
<script src="personne.js"/>
<script src="personne_User.js"/>
<toolbox>
  <menubar id="menu-application">
    <menu id="donnee-menu" label="Gestion des données">
      <menupopup id="donnee-popup">
      <menuitem label="Personnes" oncommand="AllerAOnglet(0)"/>
      </menupopup>
    </menu>
    <menu id="edition-menu" label="Edition">
      <menupopup id="edit-popup">
        <menuitem label="Annuler"/>
        <menuitem label="Refaire"/>
      </menupopup>
    </menu>
    <menu id="theme-menu" label="Changer de thème">
      <menupopup id="theme-popup">
        <menuitem label="Choisir" oncommand="BrowserOpenExtensions('themes')"/>
      </menupopup>
    </menu>
  </menubar>
</toolbox>

<!-- COMPOSANT OU SE DESSINERONT LES COMPOSANTS -->

<vbox flex="1">
<tabbox id="Main_Tabbox" flex="1">
<hbox id="box_overflow" class="tabbrowser-strip chromeclass-toolbar">
<tabs flex="1" class="tabbrowser-tabs" id="Tous_les_onglets">
 <tab flex="100" maxwidth="250" minwidth="60" crop="end" class="tabbrowser-tab" id="Onglet_Personnes" label="Personnes"/>
</tabs>
</hbox>
<tabpanels id="Tous_les_panels" flex="1">
<tabpanel flex="1" id="OngletPanel_Personnes" >
<vbox flex="1">
<hbox flex="1">
<hbox flex="1">
<vbox id="Personnes_Liste_des_personnes0" flex="1"/>
<splitter collapse="before"> <grippy/> </splitter>
<vbox flex="1" style="overflow:auto">
<vbox id="Personnes_Liste_des_personnes0_Slaves"/>
<tabbox id="tabbox_Personnes_Liste_des_personnes0" flex="1">
<tabs >
<tab label="Adhésions"/>
<tab label="Observations"/>
</tabs>
<tabpanels flex="1">
<tabpanel flex="1">
<hbox flex="1">
<vbox id="Personnes_Adhésions_9" flex="1"/>
</hbox>
</tabpanel>
<tabpanel flex="1">
<hbox flex="1">
<vbox id="Personnes_Observations_10" flex="1"/>
</hbox>
</tabpanel>
</tabpanels>
</tabbox>
<arrowscrollbox  pack="end" align="stretch" class="fondstyle">
    <button class="new-button16" disabled="true" id="Insert_Personnes_Liste_des_personnes0" label="Ajouter" oncommand="Insert_Personnes_Liste_des_personnes0()" />
    <button class="edit-button16" disabled="true" id="Update_Personnes_Liste_des_personnes0" label="Modifier" oncommand="Update_Personnes_Liste_des_personnes0()" />
    <button class="delete-button16" disabled="true" id="Delete_Personnes_Liste_des_personnes0" label="Supprimer" oncommand="Delete_Personnes_Liste_des_personnes0()" />
    <button class="accept-button16" id="Validate_Personnes_Liste_des_personnes0" label="Valider" oncommand="Validate_Personnes_Liste_des_personnes0()"  disabled="true" />
    <button class="cancel-button16" id="Annuler_Personnes_Liste_des_personnes0" label="Annuler" oncommand="Annuler_Personnes_Liste_des_personnes0()"  disabled="true" />
</arrowscrollbox>
</vbox>
</hbox>
</hbox>
</vbox>
</tabpanel>
</tabpanels>
</tabbox>
</vbox>
<statusbar id="statusbar">
  <statusbarpanel id="status_espace" label="" width="5"/>
  <statusbarpanel id="status_login" label=""/>
  <statusbarpanel id="status_Info" label=""/>
  <statusbarpanel id="status_TpsExec" flex="1" label=""/>
  <statusbarpanel id="status_counter" flex="1" label=""/>
</statusbar>
</window>
