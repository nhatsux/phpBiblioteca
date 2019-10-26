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
        $sQuery =" UPDATE libro
                   SET titulo = '".$data -> title ."'
                       ,autor =  '".$data ->author."'
                       ,num_page =  ".$data ->num_page."
                       ,encuadernacion =  '".$data ->biding."'
                       ,editorial =  '".$data ->editorial."'
                       ,lengua =  '".$data ->language."'
                       ,portada =  '".$data ->cover."'
                       ,cantidad =  ".$data ->amount."
                       WHERE isbn =  '".$data ->ISBN."'";
        $response =  $oAccesoDatos -> ejecutarComando($sQuery);
        if ($response >0)
            $msj ="Actualizado exitosamente";
        else 
            $msj ="Error al actualizar libro";
    }
}else 
    $msj ="Necesitas iniciar sesion";
$sCadJson = 
    '{
        "successful":'.$response.',
        "msj" : "'.$msj.'"
    }';
header('Content-type: application/json');
echo $sCadJson;
?>