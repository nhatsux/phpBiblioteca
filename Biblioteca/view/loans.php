<?php 
session_start();
if (!isset($_SESSION["active"]) ){
    header("Location: error.php?sErr=".$sErr);
		exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Prestamos</title>
    
    <link rel="stylesheet" href="../src/bootstrap.min.css">    
    <link rel="stylesheet" href="../src/style/menu.css">
    <link rel="stylesheet" href="../src/style/loans.css">
    <script src="../src/jquery-3.3.1.slim.min.js"></script>
    <script src="../src/bootstrap.min.js"></script>
    <script src="../src/popper.min.js"></script>
    <script src="../src/sweetalert.min.js"></script>
    <script type="module" src="../src/js/loans.js"  type="text/javascript"></script>
</head>
<body>
   
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control mr-sm-2 navbar-brand text-dark hide" type="search" placeholder="Buscar" aria-label="Search" id="searchMobile" style="width:56%;">
    <img class=" btn btn-primary btn-sm  hide"  style="width: 60px;" src="../src/image/icons/search.png" style="width:20%;" id="searchMobileBtn">

    <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
        
            <a class="nav-link" href="books.php"><img  src="../src/image/icons/book.png"> Libros</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="student.php"><img  src="../src/image/icons/student.png"> Alumnos</a>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="loans.php"><img  src="../src/image/icons/loan.png"> Prestamos</a>
        </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" id="search">
        <input class="form-control mr-sm-2" id = "searchInput"  type="search" placeholder="Buscar" aria-label="Search" >
        <a class="nav-link"  href="logout.php">Salir</a>
        </form>
    </div>
    </nav>
    <div class="table">
        <h4>Lista de Prestamos</h4>
        
        <div id="filters">
            <form id="customFilter">
                <div id="controls">
                </div>
                <button type="button" class="btn btn-light" id="btnReporte">Descargar Reporte</button>
                <button type="button" class="btn btn-light" id="btnFilter">Buscar</button>
            </form>
        </div>
         <table class ="table" id="tableLoans">
             <thead>
                 <tr>
                    <th>Matricula</th>
                    <th>ISBN</th>
                    <th>Refrendo</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Estado</th>
                    <th>Tipo</th>
                    <th>Operacion</th>
                 </tr>
             </thead>
             <tbody id="tableLoansBody">
                 
             </tbody>
         </table>
         <button type="button" class="btn btn-link" id="btnShowFilter"> 
           <img title="Filtrar" src="../src/image/icons/filter.png">
         </button>  
        <button type="button" class="btn btn-success" id="addLoan" data-toggle="modal" data-target="#addModalLoan"> 
          <img   title="Agregar un Préstamo nuevo" src="../src/image/icons/add.svg">
        </button>  
    </div>

</body>
</html>