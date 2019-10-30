<?php 
include_once("DataAccess.php");
session_start();
$oAccesoDatos=new DataAccess();
$sCadJson="";
$response = -1;
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$msj = "";
if ($_SESSION["active"]){
    if($oAccesoDatos ->conectar()){
        $sQuery =" UPDATE estudiante
                   SET matricula = '".$data -> matricula ."'
                       ,nombre =  '".$data ->nombre."'
                       ,apePaterno =  '".$data ->apePaterno."''
                       ,apeMaterno =  '".$data ->apeMaterno."'
                       ,activo =  '".$data ->activo."'
                       ,vigencia =  '".$data ->vigencia."'
                       ,id_carrera =  ".$data ->id_carrera."
                       
                       WHERE matricula =  '".$data ->matricula."'";
        $response =  $oAccesoDatos -> ejecutarComando($sQuery);
        if ($response >0)
            $msj ="Actualizado exitosamente";
        else 
            $msj ="Error al actualizar Alumno";
    }
}else 
    $msj ="Necesitas iniciar sesión";
$sCadJson = 
    '{
        "successful":'.$response.',
        "msj" : "'.$msj.'"
    }';
header('Content-type: application/json');
echo $sCadJson;
?>
