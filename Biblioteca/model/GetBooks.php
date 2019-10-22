<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQuery = "SELECT titulo,autor,num_page,encuadernacion,editorial,lengua,isbn,portada,cantidad FROM libro ORDER BY titulo";
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
    $oAccesoDatos->desconectar();
}
if ($arrRS){
    $sCadJson = 
		'{
			"successful":true,
			"arrBook":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayBook){
			$sCadJson = $sCadJson.'{
                    "title": "'.$arrayBook[0].'",
                    "author":"'.$arrayBook[1].'",
                    "num_page": '.$arrayBook[2].',
                    "biding":"'.$arrayBook[3].'",
                    "editorial":"'.$arrayBook[4].'",
                    "language":"'.$arrayBook[5].'",
                    "ISBN": "'.$arrayBook[6].'",
                    "cover":"'.$arrayBook[7].'",
                    "amount":'.$arrayBook[8].'
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
        "arrBook": []
    }';
}
    header('Content-type: application/json');
	echo $sCadJson;

?>