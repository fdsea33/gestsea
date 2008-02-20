var myTabRef=new Array();

/* retourne l'identifiant de la variable */
function AddVar(variable){
    myTabRef.push(variable);
    return myTabRef.length-1;
}

/* la variable depuis l'identifiant */
function GetVar(indice){
    return myTabRef[indice];
}

var id=0;

function genererId()
{
    id=id+1;
    return "id_"+id;
}
