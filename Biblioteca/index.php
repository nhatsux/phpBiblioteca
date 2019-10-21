<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/style/index.css">
    <link rel="stylesheet" href="src/bootstrap.min.css">
    <script src="src/jquery-3.3.1.slim.min.js"></script>
    <script src="src/sweetalert.min.js"></script>
    <script  type="module" src="src/index.js" ></script>

    <title>Biblioteca</title>
</head>
<body  >
    <div class= "container" >
        <div class="center text-white text-center">
            <form class="needs-validation">
                <img src="src/image/logo.png" class="mb-5" id="logo">
                <h4>Iniciar Sesión</h4>
                <div class="form-group mb-2">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario"  class="form-control col-xs-2 " placeholder="Nombre de usuario" 
                    required>
                </div>
                <div class= "form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id= "password" class="form-control col-xs-2" placeholder="Contraseña">
                </div>
                <button  type="button" id="btnLogin" class="btn btn-primary mt-2" >Iniciar Sesion</button>
            </form>
        </div>
    </div>
</body>
</html>