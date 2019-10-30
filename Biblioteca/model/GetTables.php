<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
$sQuery ="";
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQuery = "SELECT matricula,nombre,apepaterno,apematerno,activo,vigencia,id_carrera FROM estudiante LIMIT 2";
    
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
   
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
                    "activo": '.($arrayStudent[4]=="t"?1:0).',
                    "vigencia": '.($arrayStudent[5]=="t"?1:0).',
                    "id_carrera": '.$arrayStudent[6].'
					},';
        }
        $sQuery = "SELECT isbn,titulo,autor,num_page,encuadernacion,editorial,lengua,portada,cantidad FROM libro LIMIT 2";
        $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
		//Sobra una coma, eliminarla
		$sCadJson = substr($sCadJson,0, strlen($sCadJson)-1);
		
		//Colocar cierre de arreglo y de objeto
		$sCadJson = $sCadJson.'
    ],

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
    ],

			"arrLoan":[';
            $sQuery = "SELECT  matricula,isbn,refrendo,fechaini,fechafin,estado,tipo FROM prestamo LIMIT 2";
            $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
		//Recorrer arreglo para llenar objetos
		foreach($arrRS as $arrayLoan){
			$sCadJson = $sCadJson.'{
                    "matricula": "'.$arrayLoan[0].'",
                    "ISBN": "'.$arrayLoan[1].'",
                    "refrendo": '.$arrayLoan[2].',
                    "fechaini": "'.$arrayLoan[3].'",
                    "fechafin": "'.$arrayLoan[4].'",
                    "estado": '.($arrayLoan[5]=="t"?1:0).',
                    "tipo": '.($arrayLoan[6]=="t"?1:0).'
					},';
		}
		//Sobra una coma, eliminarla
		$sCadJson = substr($sCadJson,0, strlen($sCadJson)-1);
		$oAccesoDatos -> desconectar();
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
