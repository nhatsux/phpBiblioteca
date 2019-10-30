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
        $sQuery= "SELECT t1.matricula,t1.nombre AS estudiante,t1.apepaterno,t1.apematerno,t1.activo,t1.vigencia,t2.nombre
                  FROM estudiante t1, carrera t2
                  WHERE t1.matricula = '".$data->num_control."' 
                  AND t2.id_carrera = t1.id_carrera";
        $response = $oAccesoDatos -> ejecutarConsulta($sQuery);
        $oAccesoDatos -> desconectar();
        if (sizeof($response)> 0)
            $msj =true;
        else {
            $msj ="Alumno no encontrado";
            $response = false;

        }

        
    }
}else{ 
$msj ="Necesitas iniciar sesion";
$response = false;
}
if (sizeof($response)> 0)
$sCadJson = 
'{
    "successful":'.$msj.',
    "student" : {
                "matricula":"'.$response[0][0].'",
                "nombre":"'.$response[0][1].'",
                "apePaterno":"'.$response[0][2].'",
                "apeMaterno":"'.$response[0][3].'",
                "activo":"'.($response[0][4]=="t"?1:0).'",
                "vigencia":"'.($response[0][5]=="t"?1:0).'",
                "carrera" : "'.$response[0][6].'"
                }
}';
else 
'{
    "successful":'.$response.',
    "student" : "'.$msj.'"
}';
header('Content-type: application/json');
echo $sCadJson;
?>