<?php 
include_once("DataAccess.php");
session_start();
$oAccesoDatos=new DataAccess();
$sCadJson="";
$response = false;
$arrRS = null;
if (isset($_POST["txtCve"]) && !empty($_POST["txtCve"]) &&
		isset($_POST["txtPwd"]) && !empty($_POST["txtPwd"])){
    
    if($oAccesoDatos ->conectar()){
        $sQuery = "SELECT * FROM admi WHERE usuario = '".$_POST["txtCve"]."' AND password = '".$_POST["txtPwd"]."' ";
        $arrRS = $oAccesoDatos -> ejecutarConsulta($sQuery);
        $oAccesoDatos->desconectar();
        if ($arrRS){
            $response =  1;
            $_SESSION["active"] = true;
        }
        else
            $response =  0;
    }
}

$sCadJson = 
		'{
			"successful":'.$response.'
		}';
header('Content-type: application/json');
echo $sCadJson;
?>
