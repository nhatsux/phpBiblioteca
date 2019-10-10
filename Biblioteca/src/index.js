import {loginUser} from "./js/login.js";
 // functions 
const login = ()=> { 
    if (loginUser(usuario.value,password.value))
        btnLogin.innerHTML = `Ingresando ...`;
   
} 

btnLogin.addEventListener("click", login);