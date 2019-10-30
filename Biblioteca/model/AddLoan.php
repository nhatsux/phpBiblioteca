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

        $sQuery = "SELECT * FROM prestamo WHERE matricula = '".$data->.matricula"', ISBN = '".$data->.ISBN"'";

        $response =  $oAccesoDatos -> ejecutarConsulta($sQuery);
        if (sizeof($response)> 0){
            $msj ="El registro préstamo ya existe en el sistema, no se agregó préstamo";
            $response = 0;
        }else {
            $sQuery = "INSERT INTO prestamo (matricula, ISBN, refrendo, fechaini, fechaFin, estado, id_deuda, tipo)
                                    VALUES ('".$data ->matricula."','".$data ->ISBN."',".$data ->1.",
                                            '".$data ->now()."',
                                            '".$data ->now()+'3day'."', ".$data -> 1.", ".$data ->null.", ".$data ->0.")";
            $response =  $oAccesoDatos -> ejecutarComando($sQuery);
            $oAccesoDatos -> desconectar();
            if ($response >0)
                $msj ="Agregado exitosamente";
            else 
                $msj ="Error al agregar préstamo";
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
