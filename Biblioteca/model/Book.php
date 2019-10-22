<?PHP
include_once("DataAccess.php")

class Book {
	private $imaCover = "";
	private $title = "";
	private $author = "";
	private $ISBN = "";
	private $editorial = "";
	private $biding = "";
	private $languaje = "";
	private $numPages = "";
	private $amount = "";
    }

    public function getImaCover(){
        return $this->imaCover
    }
    
    public function setImaCover(){
        $this->imaCover = $value;
    }

    public function getTitle(){
        return $this->title
    }
    
    public function setTitle(){
        $this->title = $value;
    }

    public function getAuthor(){
        return $this->author
    }
    
    public function setAuthor(){
        $this->author = $value;
    }

    public function getISBN(){
        return $this->ISBN
    }
    
    public function setISBN(){
        $this->ISBN = $value;
    }

    public function getEditorial(){
        return $this->editorial
    }
    
    public function setEditorial(){
        $this->editorial = $value;
    }

    public function getBiding(){
        return $this->biding
    }
    
    public function setBiding(){
        $this->biding = $value;
    }

    public function getLanguaje(){
        return $this->languaje
    }
    
    public function setLanguaje(){
        $this->languaje = $value;
    }

    public function getNumPages(){
        return $this->numPages
    }
    
    public function setNumPages(){
        $this->numPages = $value;
    }

    public function getAmount(){
        return $this->amount
    }
    
    public function setAmount(){
        $this->amount = $value;
    }

    function buscar(){
        $DataAccess=new DataAccess();
        $sQuery="";
        $arrRS=null;
        $bRet = false;
            if ($this->title==0)
                throw new Exception("Book->buscar(): Falta datos");
            else{
                if ($DataAccess->conectar()){
                     $sQuery = " SELECT imaCover, title, author, isbn, editorial
                                      biding, languaje, numPages, amount
                                FROM libro 
                                WHERE title = ".$this->title;
                    $arrRS = $DataAccess->ejecutarConsulta($sQuery);
                    $DataAccess->desconectar();
                    if ($arrRS){
                        $this->imaCover = $arrRS[0][0];
                        $this->title = $arrRS[0][1];
                        $this->author = $arrRS[0][2];
                        $this->ISBN = $arrRS[0][3];
                        $this->editorial = $arrRS[0][4];
                        $this->biding = $arrRS[0][5];
                        $this->languaje = $arrRS[0][6];
                        $this->numPages = $arrRS[0][7];
                        $this->numPages = $amount[0][8];
                        $bRet = true;
                    }
                } 
            }
            return $bRet;
        }

        /*Insertar, regresa el número de registros agregados*/
        function insertar(){
        $DataAccess=new DataAccess();
        $sQuery="";
        $nAfectados=-1;
            if ($this->imaCover == "" OR $this->title == "" OR 
                $this->author == "" OR $this->ISBN == "" OR $this->editorial== "" OR $this->biding == "" OR $this->languaje == "" OR 
                $this->numPages == "" OR $this->numPages == "")
                throw new Exception("Book->insertar(): Faltan datos");
            else{
                if ($DataAccess->conectar()){
                     $sQuery = "INSERT INTO libro (isbn, titulo, autor, 
                                                num_page, encuadernacion, editorial, lengua, portada, cantidad) 
                        VALUES ('".$this->ISBN."','".$this->title."',
                        '".$this->author."', '".$this->numPages."',
                        '".$this->binding."', '".$this->editorial."',
                        '".$this->languaje."', '".$this->imgCover."',
                        '".$this->amount."');";
                    $nAfectados = $DataAccess->ejecutarComando($sQuery);
                    $DataAccess->desconectar();			
                }
            }
            return $nAfectados;
        }
        
        /*Modificar, regresa el número de registros modificados*/
        function modificar(){
        $DataAccess=new DataAccess();
        $sQuery="";
        $nAfectados=-1;
            if ($this->imaCover == "" OR $this->title == "" OR 
                $this->author == "" OR $this->ISBN == "" OR $this->editorial== "" OR $this->biding == "" OR $this->languaje == "" OR 
                $this->numPages == "" OR $this->numPages == "")
                throw new Exception("Book->modificar(): Faltan datos");
            else{
                if ($DataAccess->conectar()){
                     $sQuery = "UPDATE libro 
                        SET isbn= '".$this->ISBN."' , 
                        titulo= '".$this->title."' , 
                        autor = '".$this->author."',
                        num_page = '".$this->numPages."',
                        encuadernacion = '".$this->binding."',
                        editorial = '".$this->editorial."',
                        lengua = '".$this->languaje."', 
                        portada = '".$this->imgCover."', 
                        cantidad = ".$this->amount."
                        WHERE isbn = ".$this->ISBN;
                    $nAfectados = $DataAccess->ejecutarComando($sQuery);
                    $DataAccess->desconectar();
                }
            }
            return $nAfectados;
        }
        
        /*Busca todos los registros, 
         regresa falso si no hay información o un arreglo de Libro/Book*/
        function buscarTodos(){
        $DataAccess=new DataAccess();
        $sQuery="";
        $arrRS=null;
        $aLinea=null;
        $j=0;
        $oPersHosp=null;
        $arrResultado=false;
            if ($DataAccess->conectar()){
                 $sQuery = "SELECT isbn, titulo, autor, num_page, 
                 encuadernacion, editorial, lengua, portada, cantidad
                    FROM libro 
                    ORDER BY isbn";
                $arrRS = $DataAccess->ejecutarConsulta($sQuery);
                $DataAccess->desconectar();
                if ($arrRS){
                    foreach($arrRS as $aLinea){
                        $Book = new Book();
                        $Book->setISBN($aLinea[0]);
                        $Book->setTitle($aLinea[1]);
                        $Book->setAuthor($aLinea[2]);
                        $Book->setNumPages($aLinea[3]);
                        $Book->setBiding($aLinea[4]));
                        $Book->setEditorial($aLinea[5]);
                        $Book->setLanguaje($aLinea[6]);
                        $Book->setImaCover($aLinea[7]);
                        $Book->setAmount($aLinea[8]);
                        $arrResultado[$j] = $Book;
                        $j=$j+1;
                    }
                }
                else
                    $arrResultado = false;
            }
            return $arrResultado;
        }
}
?>