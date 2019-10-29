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

        $sQuery = "SELECT * FROM libro WHERE isbn = '".$data->ISBN."'";
        $response =  $oAccesoDatos -> ejecutarConsulta($sQuery);
        if (sizeof($response)> 0){
            $msj ="ISBN existente en el sistema, no se agrego el libro";
            $response = 0;
        }else {
            $sQuery = "INSERT INTO libro (cantidad,titulo,autor,num_page,encuadernacion,editorial,lengua,ISBN,portada)
                                    VALUES (".$data ->amount.",'".$data ->title."','".$data ->author."',
                                            ".$data->num_page.",'".$data ->biding."','".$data->editorial."',
                                            '".$data ->language."','".$data->ISBN."','".$data->cover."')";
            $response =  $oAccesoDatos -> ejecutarComando($sQuery);
            $oAccesoDatos -> desconectar();
            if ($response >0)
                $msj ="Agregado exitosamente";
            else 
                $msj ="Error al agregar libro";
        }
        
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