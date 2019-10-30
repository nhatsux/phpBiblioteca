<?php

error_reporting(E_ALL);

class DataAccess{
    private $Conexion=-1;

    function conectar(){
        $Ret = false;
        try {
            $this->Conexion = pg_connect("host=localhost port=5432 user=postgres password=qwerty123 dbname=biblioteca", PGSQL_CONNECT_FORCE_NEW); 
        } catch (Exception $e){
            throw $e;
        }
        if (!$this->Conexion)
            throw new Exception("Error al conectar a la base de datos");
            else
                $Ret  = true;
                return $Ret;
    }
    
    function desconectar(){
        $Ret = true;
        if ($this->Conexion != -1)
        {
            $Ret = pg_close($this->Conexion);
        }
        return $Ret;
    }

    function ejecutarConsulta($psConsulta){
		$arrRS = null;
		$rst = null;
		$arrLin = null;
		$sValCol = "";
		$i=0;
		$j=0;
			if ($psConsulta == ""){
		       throw new Exception("DataAccess->ejecutarConsulta: falta indicar la consulta");
			}
			if ($this->Conexion == -1){
				throw new Exception("DataAccess->ejecutarConsulta: falta conectar la base");
			}
			try{
				$rst = pg_query($this->Conexion, $psConsulta);
			}catch(Exception $e){
				throw $e;
			}
			if ($rst){
				while($arrLin = pg_fetch_row($rst)){ 
					foreach($arrLin as $sValCol){
						$arrRS[$i][$j] = $sValCol;
						$j++;
					}
					$j=0;
					$i++;
				}
			}
			else{
				throw new Exception($this->Conexion->error);
			}
			return $arrRS;
		}
		
		/*Ejecuta en la base de datos el comando que recibió por parámetro
		Regresa el número de registros afectados por el comando*/
      	function ejecutarComando($psComando){
		$nAfectados = -1;
	       if ($psComando == ""){
		       throw new Exception("DataAccess->ejecutarComando: falta indicar el comando");
			}
			if ($this->Conexion == -1){
				throw new Exception("DataAccess->ejecutarComando: falta conectar la base");
			}
			try{
	       	   $bResult=pg_query($this->Conexion, $psComando);
			   $nAfectados = pg_affected_rows($bResult);
			}catch(Exception $e){
				throw $e;
			}
			return $nAfectados;
		}
	}


?>