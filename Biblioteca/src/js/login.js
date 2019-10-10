

function loginUser(usuario,pass){
    let band = false;
    if (usuario === "" || pass === ""){
        swal("Error","Faltan datos","error")

    }else {
        if (usuario === "admi" && pass === "123"){
            alert (`Sesion iniciada`) // redireccion
            band = true;
            window.location.replace("view/books.php");
        }
        else {
            swal("Error","Usuario Invalido","error")
        }
    }
    return band
};

export {loginUser};