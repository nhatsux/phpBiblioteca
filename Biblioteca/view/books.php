<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Libros</title>
    <link rel="stylesheet" href="../src/bootstrap.min.css">
    <link rel="stylesheet" href="../src/style/books.css">
    <link rel="stylesheet" href="../src/style/menu.css">
    <script src="../src/jquery-3.3.1.slim.min.js"></script>
    <script src="../src/sweetalert.min.js"></script>
    <script type="module" src="../src/js/books.js"  type="text/javascript"></script>

</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="position:fixed;z-index:1;width:100%">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control mr-sm-2 navbar-brand text-dark hide" type="search" placeholder="Buscar" aria-label="Search" id="searchMobile" style="width:76%;">


  <div class="collapse navbar-collapse" id="navbarToggler">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" id="search">
      <a class="nav-link" href="#">Salir</a>
    </form>
  </div>
</nav>




   <div class = "container-fluid ">
       <div class= "d-flex justify-content-center ">
            <div  class=" card-columns mt-5" id="deck">
            </div>
       </div>

       <div class= "d-flex justify-content-center" >
            <nav  class = "mt-0" aria-label="..." >
                    <ul class = "pagination" id= "pages"  >
                            
                    </ul>
            </nav>
       </div>
   </div>
</body>
</html>