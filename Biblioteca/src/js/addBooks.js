import {item_modal} from './books.js'


imgCover.onclick  = ()=> { cover.click()}

addBook.onclick = ()=>{
    btnBookM.innerHTML = "Agregar"; titleModalBook.innerHTML="Agregar Libro"; 
    activeForm();
    emptyForm();
}


container.onclick= ()=> {
 if (item_modal != undefined){
    switch (item_modal.name) {
        case "edit":
             activeForm();
             btnBookM.innerHTML = "Editar"; titleModalBook.innerHTML="Editar Libro"
             fillFormEdit();
             ISBN.disabled = true;
            break;
        case "loan":
            loanBook();
        break;        
        default:
            break;
    }
 }
   
}

function fillFormEdit(){
    title.value= item_modal.book.title;
    author.value= item_modal.book.author;
    ISBN.value= item_modal.book.ISBN;
    editorial.value = item_modal.book.editorial;
    biding.value = item_modal.book.binding;
    language.value = item_modal.book.language;
    numPages.value = item_modal.book.num_page;
    amount.value = item_modal.book.amount;
    imgCover.src = `../src/image/cover-books/${item_modal.book.cover}`;
    imgCover.data = item_modal.book.cover;
}

function emptyForm(){
    title.value= ""
    author.value= ""
    ISBN.value= ""
    editorial.value = ""
    biding.value = ""
    language.value = ""
    numPages.value = ""
    amount.value = ""
    imgCover.src = `../src/image/icons/image.png`
    imgCover.data = "newBook.png"

}


function activeForm(){
    
    title.disabled = false;
    author.disabled = false;
    ISBN.disabled = false;
    editorial.disabled = false;
    biding.disabled = false;
    language.disabled = false;
    numPages.disabled = false;
    amount.disabled = false;
    cover.disabled = false;
}

btnBookM.onclick = ()=>{
   switch (btnBookM.innerHTML) {
       case 'Agregar':
        addBookModal();
       break;
       case 'Editar':
        editBookModal();
       break;
   
       default:
           break;
   }
   
}

function validatorFormBook (){
    var isFull = true;
    for (const item of formBook.elements) {
        if (item.type != "file" && item.type != "button" && item.type != "submit" ){ 
            if(item.value==="" ){
                isFull = false;
                swal({
                    title: "Error",
                    text: "Revisar Informacion",
                    icon: "warning",
                    button: "Ok",
                    closeOnClickOutside: false
                    
                    });
            }
            
        }        
    }
    
return isFull;
}

function addBookModal (){
    if (validatorFormBook()){
        sendForm(createForm(),"/file.php","Guardando");
        
    }
}

function editBookModal(){
    if (validatorFormBook())
        sendForm(createForm(),"/file.php","Editando");
}

cover.onchange = () =>{
    uploadImage();
}

function uploadImage (){
    
    if (isFileImage()){
        var formdata = new FormData();
        formdata.append('image', cover.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../src/helpers/upload.php');
        //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(formdata);
        xhr.onreadystatechange = ()=>{
            if (xhr.status === 200 && xhr.responseText ===1){
                imgCover.src = `../src/image/cover-books/${cover.files[0].name}`
                imgCover.data = cover.files[0].name
            }else {
                swal({
                    title: "Error al cargar imagen",
                    text: "Intenta otra vez",
                    icon: "warning",
                    button: "Ok",
                    closeOnClickOutside: false
                    });
            }


        }
    }
}

function isFileImage() {
    var isImage = true;
    const file = cover.files[0];
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
        swal({
            title: "Error",
            text: "Tipo de archivo no admitido",
            icon: "warning",
            button: "Ok",
            closeOnClickOutside: false
            });
            isImage = false;
    }
    return isImage ;
}

function createForm(){
    var formdata = new FormData();
    formdata.append("cover", imgCover.data);
    formdata.append("title",title.value);
    formdata.append("author",author.value);
    formdata.append("ISBN",ISBN.value);
    formdata.append("editorial",editorial.value);
    formdata.append("biding",biding.value);
    formdata.append("language",language.value);
    formdata.append("numPages", numPages.value);
    formdata.append("amount", amount.value);
return formdata;
}


async function   sendForm (formdata,url,msj){
    await swal(`${msj}...`, {
        buttons: false,
        timer: 3000,
      })
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", url);
    xmlhttp.send(formdata);
    xmlhttp.onreadystatechange = ()=>{
       
        if ( xmlhttp.status === 200){
            swal({
                title: "Exito",
                text: "Proceso Exisoto",
                icon: "success",
                button: "Ok",
                closeOnClickOutside: false
                });
            
        }else {
            swal({
                title: "Error",
                text: "Intenta otra vez",
                icon: "error",
                button: "Ok",
                closeOnClickOutside: false
                });
        }


    }
    
}
function loanBook(){
    titleBookLoan.innerHTML  = `<b>Titulo:</b> ${item_modal.book.title}`
    authorBookLoan.innerHTML = `<b>Autor:</b> ${item_modal.book.author}`
    amountBookLoan.innerHTML = `<b>Disponibles:</b> ${item_modal.book.amount}`
}

searchStudent.onclick = ()=>{
  
    if (numC.value.length === 8 && typeof parseInt(numC.value) === 'number')
        searchNumControl()
       
}


async function searchNumControl(){
    var formdata = new FormData();
    formdata.append("numControl", numC.value);
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", 'getStudent.php');
    xmlhttp.send(formdata);
    await swal(`Buscando numero control ${numC.value}...`, {
        buttons: false,
        timer: 3000,
      })
    var response  = true;
    if (response){
        resultSearchStudent.innerHTML = 
        `
        <hr>
        <div> 
            Student
        </div>
        `
    }else {
        resultSearchStudent.innerHTML = 
        `
        <hr>
        <div> 
            No encontrado, registrar alumno <a class="edit btn btn-primary btn-sm " href="student.php">Ir</a>
        </div>
        `
    }


}

