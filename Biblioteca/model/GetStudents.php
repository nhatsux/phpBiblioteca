<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQuery= " SELECT t1.matricula,t1.nombre AS estudiante,t1.apepaterno,t1.apematerno,t1.activo,t1.vigencia,t2.nombre,t1.id_carrera
                  FROM estudiante t1, carrera t2
                  WHERE  t2.id_carrera = t1.id_carrera ORDER BY estudiante";
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
    $oAccesoDatos->desconectar();
}
if ($arrRS){
    $sCadJson = 
		'{
			"successful":true,
			"arrStudent":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayBook){
			$sCadJson = $sCadJson.'{
                    "matricula": "'.$arrayBook[0].'",
                    "nombre":"'.$arrayBook[1].'",
                    "apePaterno": "'.$arrayBook[2].'",
                    "apeMaterno":"'.$arrayBook[3].'",
                    "activo":'.($arrayBook[4]=="t"?1:0).',
                    "vigencia":'.($arrayBook[5]=="t"?1:0).',
                    "carrera": "'.$arrayBook[6].'",
                    "id_carrera":'.$arrayBook[7].'
					},';
		}
		//Sobra una coma, eliminarla
		$sCadJson = substr($sCadJson,0, strlen($sCadJson)-1);
		
		//Colocar cierre de arreglo y de objeto
		$sCadJson = $sCadJson.'
			]
		}';
}
else{
    $sCadJson = 
    '{
        "successful":false,
        "arrStudent": []
    }';
}
    header('Content-type: application/json');
	echo $sCadJson;
?>