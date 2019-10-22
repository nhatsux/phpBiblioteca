<?php

error_reporting(E_ALL);

class DataAccess{
    private $Conexion=-1;

    function conectar(){
        $Ret = false;
        try {
            $this->Conexion = pg_connect("host=localhost port=5432 user= password= dbname=", PGSQL_CONNECT_FORCE_NEW);
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
}

?>