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

        $sQuery = "SELECT * FROM estudiante WHERE matricula = '".$data->matricula."'";
        $response =  $oAccesoDatos -> ejecutarConsulta($sQuery);
        if (sizeof($response)> 0){
            $msj ="La Matrícula existente en el sistema, no se agregó alumno";
            $response = 0;
        }else {
            $sQuery = "INSERT INTO estudiante (nombre, apePaterno, apeMaterno, activo, vigencia, id_carrera)
                                    VALUES ('".$data ->nombre."','".$data ->apePaterno."','".$data ->apeMaterno."',
                                            '".$data ->activo."',
                                            '".$data ->vigencia."', ".$data ->id_carrera.")";
            $response =  $oAccesoDatos -> ejecutarComando($sQuery);
            $oAccesoDatos -> desconectar();
            if ($response >0)
                $msj ="Agregado exitosamente";
            else 
                $msj ="Error al agregar alumno";
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
?>
