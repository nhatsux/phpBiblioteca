<?php
include_once("model\Book.php");
session_start();
$sErr="";
$arrBook=null;
$Book = new Book();
$cdJson="";

    /*Verificar que exista sesión*/
    if (isset($_SESSION["usuario"]) && !empty($_SESSION["usuario"])){
        try{
            $arrBook = $Book->buscarTodos();
        
            if ($arrBook == null || count($arrBook)==0)
                $sErr = "No hay libros registrados";
    }catch(Exception $e){
        //Enviar el error específico a la bitácora de php (dentro de php\logs\php_error_log
        error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
        $sErr = "Error con la base de datos";
        }
    }
    else
		$sErr = "Se requiere iniciar sesión";
	
	if ($sErr == ""){
		
        $sCadJson = 
        '{
			"arrBook":[';
		
		//Recorrer arreglo para llenar objetos
		foreach($arrBook as $Book){
			$sCadJson = $sCadJson.'{
                    "cover": '.$Book->getImgCover().', 
                    "title": '.$Book->getTitle().', 
                    "author": '.$Book->getAuthor().', 
                    "ISBN": '.$Book->getISBN().', 
                    "editorial": '.$Book->getEditorial().', 
                    "binding": '.$Book->getBinding().', 
                    "languaje": '.$Book->getLanguaje().', 
                    "numPages": '.$Book->getNumPages().', 
					"amount":"'.$Book->getAmount().'"
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
			"arrBook": []
		}';
	}
	header('Content-type: application/json');
	echo $sCadJson;
?>