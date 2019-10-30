<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQueryS = "SELECT estudiante.* FROM estudiante LIMIT 2";
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQueryS);
    $sQueryL = "SELECT  libro.* FROM  libro LIMIT 2";
    $arrRL = $oAccesoDatos -> ejecutarConsulta($sQueryL);
    $sQueryP = "SELECT  prestamo.* FROM  prestamo LIMIT 2";
    $arrRP = $oAccesoDatos -> ejecutarConsulta($sQueryP);
    $oAccesoDatos->desconectar();
}
if ($arrRS){
    $sCadJson = 
		'{
			"successful":true,
			"arrStudent":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayStudent){
			$sCadJson = $sCadJson.'{
                    "matricula": "'.$arrayStudent[0].'",
                    "nombre": "'.$arrayStudent[1].'",
                    "apePaterno": "'.$arrayStudent[2].'",
                    "apeMaterno": "'.$arrayStudent[3].'",
                    "activo": '.$arrayStudent[4].'",
                    "vigencia": '.$arrayStudent[5].',
                    "id_carrera": '.$arrayStudent[6].'
					},';
		}
		//Sobra una coma, eliminarla
		$sCadJson = substr($sCadJson,0, strlen($sCadJson)-1);
		
		//Colocar cierre de arreglo y de objeto
		$sCadJson = $sCadJson.'
			]

			"arrBook":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayBook){
			$sCadJson = $sCadJson.'{
                    "ISBN": "'.$arrayBook[0].'",
                    "titulo": "'.$arrayBook[1].'",
                    "autor": "'.$arrayBook[2].'",
                    "num_page": '.$arrayBook[3].',
                    "encuadernacion": "'.$arrayBook[4].'",
                    "editorial": "'.$arrayBook[5].'",
                    "lengua": "'.$arrayBook[6].'",
                    "portada": "'.$arrayBook[7].'",
                    "cantidad": '.$arrayBook[8].'
					},';
		}
		//Sobra una coma, eliminarla
		$sCadJson = substr($sCadJson,0, strlen($sCadJson)-1);
		
		//Colocar cierre de arreglo y de objeto
		$sCadJson = $sCadJson.'
			]

			"arrLoan":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayLoan){
			$sCadJson = $sCadJson.'{
                    "matricula": "'.$arrayLoan[0].'",
                    "ISBN": "'.$arrayLoan[1].'",
                    "refrendo": '.$arrayLoan[2].',
                    "fechaini": "'.$arrayLoan[3].'",
                    "fechafin": "'.$arrayLoan[4].'",
                    "estado": '.$arrayLoan[5].',
                    "id_deuda": '.$arrayLoan[6].',
                    "tipo": '.$arrayLoan[7].'
                    
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
        "arrBook": []
        "arrLoan": []
    }';
}
    header('Content-type: application/json');
	echo $sCadJson;

?>
