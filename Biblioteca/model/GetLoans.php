<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQuery= " SELECT t1.matricula,t1.ISBN,t1.refrendo,t1.fechaIni,t1.fechaFin,t1.estado,t1.tipo
                  FROM prestamo t1";
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
    $oAccesoDatos->desconectar();
}
if ($arrRS){
    $sCadJson = 
		'{
			"successful":true,
			"arrLoans":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayLoans){
			$sCadJson = $sCadJson.'{
                    "matricula": "'.$arrayLoans[0].'",
                    "ISBN":"'.$arrayLoans[1].'",
                    "refrendo": '.$arrayLoans[2].',
                    "fechaIni":"'.$arrayLoans[3].'",
                    "fechaFin":"'.$arrayLoans[4].'",
                    "estado":'.($arrayLoans[5]).',
                    "tipo": '.($arrayLoans[6]=="t"?1:0).'
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
        "arrLoans": []
    }';
}
    header('Content-type: application/json');
	echo $sCadJson;
?>