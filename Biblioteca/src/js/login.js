

function loginUser(usuario,pass){
    let band = false;
    if (usuario === "" || pass === ""){
        swal("Error","Faltan datos","error")

    }else {
        var formdata = new FormData();
        formdata.append("txtCve", usuario);
        formdata.append("txtPwd", pass);
        var xmlhttp = new XMLHttpRequest(); 
        xmlhttp.responseType = 'json';  // new HttpRequest instance 
        xmlhttp.open("POST", 'model/login.php',true);
        xmlhttp.send(formdata);
        xmlhttp.onload = e =>{
           var  response = e.target.response;
            if (response.successful){
                band == true;
                window.location.replace("view/books.php");
            }else 
                swal("Error","Usuario no valido","error")
        }
    }
    return band
};

export {loginUser};