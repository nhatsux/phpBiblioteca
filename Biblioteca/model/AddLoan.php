<?php 
include_once("DataAccess.php");
session_start();
$oAccesoDatos = new DataAccess();
$sCadJson="";
$response = -1;
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$msj = "";
if ($_SESSION["active"]){
    if($oAccesoDatos ->conectar()){

        $sQuery = "SELECT * FROM prestamo WHERE matricula = '".$data->matricula."' AND  isbn = '".$data->ISBN."'";
        $response =  $oAccesoDatos -> ejecutarConsulta($sQuery);
        if (isset($response)){
            $msj ="El registro préstamo ya existe en el sistema, no se agregó préstamo";
            $response = 0;
        }else {
            $sQuery = "INSERT INTO prestamo (matricula, isbn, refrendo, fechaini, fechafin, estado,tipo)
                                    VALUES ('".$data ->matricula."','".$data ->ISBN."',1,
                                            now(),now()+'3 day',true,".$data->tipo."::boolean)";
            $response =  $oAccesoDatos -> ejecutarComando($sQuery);
            $oAccesoDatos -> desconectar();
            if ($response >0){
                $msj ="Agregado exitosamente";
                $response = true;
            }              
            else{
                $msj ="Error al agregar préstamo";
                $response = false;
            } 
                
        }
        
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
