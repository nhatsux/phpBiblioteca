<?php 
include_once("DataAccess.php");
$oAccesoDatos=new DataAccess();
$sCadJson="";
$arrRS = null;
if($oAccesoDatos ->conectar()){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $sQuery= " SELECT  t1.fechafin,t1.estado,t1.refrendo,t2.titulo,t1.isbn,t3.activo FROM prestamo t1, libro t2 , estudiante t3 WHERE t1.matricula = '".$data->matricula."' AND  t2.isbn = t1.isbn AND t3.matricula = t1.matricula";
    $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
    $oAccesoDatos->desconectar();
}
if ($arrRS){
    $sCadJson = 
        '{
            "successful":true,
            "arrLoan":[';
        
        //Recorrer arreglo para llenar objetos
        foreach($arrRS as $arrayLoan){
            $sCadJson = $sCadJson.'{
                    "fechaEntrega": "'.$arrayLoan[0].'",
                    "estado":'.($arrayLoan[1]=="t"?1:0).',
                    "refrendo": '.$arrayLoan[2].',
                    "titulo":"'.$arrayLoan[3].'",
                    "ISBN":"'.$arrayLoan[4].'",
                    "activo":'.($arrayLoan[1]=="t"?1:0).'
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
        "arrLoan": []
    }';
}
    header('Content-type: application/json');
    echo $sCadJson;
?>