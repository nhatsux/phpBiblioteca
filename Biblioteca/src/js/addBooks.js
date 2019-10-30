import {item_modal,buildViewBooks} from './books.js'
import {findStudent} from './studentData.js'
import {findLoandByStudent, insertNewLoan} from './loan.js';


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
    biding.value = item_modal.book.biding;
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
        sendForm(createForm(),"../model/AddBook.php","Guardando");
        
    }
}

function editBookModal(){
    if (validatorFormBook())
        sendForm(createForm(),"../model/EditBook.php","Editando");
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
   var  data = { title: title.value,
            author: author.value,
            num_page: parseInt(numPages.value),
            biding: biding.value,
            editorial: editorial.value,
            language : language.value,
            cover: imgCover.data,
            amount : parseInt(amount.value),
            ISBN : ISBN.value
           };
return data;
}


async function   sendForm (data,url,msj){
    await swal(`${msj}...`, {
        buttons: false,
        timer: 2000,
      })
      
      try {
        const response = await fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        if ( json.successful){
        await swal({
                title: "Exito",
                text: `${json.msj}`,
                icon: "success",
                button: "Ok",
                closeOnClickOutside: false,
                timer: 2000
                });
            cancel.click();
            buildViewBooks(true);
          
        }else {
            swal({
                title: "Error",
                text:  `${json.msj}`,
                icon: "error",
                button: "Ok",
                closeOnClickOutside: false
                });
        }
        
      } catch (error) {
        swal({
            title: "Error",
            text: `Error:(${error})`,
            icon: "error",
            button: "Ok",
            closeOnClickOutside: false
            });
      }
       
        
    
}
function loanBook(){
    titleBookLoan.innerHTML  = `<b>Titulo:</b> ${item_modal.book.title}`
    authorBookLoan.innerHTML = `<b>Autor:</b> ${item_modal.book.author}`
    amountBookLoan.innerHTML = `<b>Disponibles:</b> ${item_modal.book.amount}`
    titleBookLoan.dataset.isbn = `${item_modal.book.ISBN}`;
}

searchStudent.onclick = ()=>{
  
    if (numC.value.length === 8 && typeof parseInt(numC.value) === 'number')
        searchNumControl()
       
}


async function searchNumControl(){
    
    var response  = await findStudent (numC.value)
    console.log(response);
    if (response.successful){
        let msj;
        let bgColorTable;
        if (amountBookLoan.innerHTML > 3)
            btnLoanM.disabled = false;

        if (response.student.activo ==1){
            msj= "El alumno tiene una multa pendiente";
            bgColorTable= "bg-danger";
            btnLoanM.disabled = true;
            btnLoanL.disabled = true;
        }else if (!response.student.vigencia){
            msj= "Sin vigencia en el sistema";
            bgColorTable= "bg-warning";
            btnLoanM.disabled = true;
            btnLoanL.disabled = true;
        }else {
            msj= "Aceptado";
            bgColorTable= "bg-success";
        }
        resultSearchStudent.innerHTML = 
        `
        <br>
        <div> 
        <table class="table table-bordered">
            <tbody>
                <tr class= "${bgColorTable}"> 
                    <td>${response.student.matricula}</td>
                    <td>${response.student.nombre} ${response.student.apePaterno} ${response.student.apeMaterno}</td>
                    <td>${response.student.carrera}</td>
                </tr>
            </tbody>
        </table>
            <small>${msj}, Actualizar datos <a class="edit btn btn-primary btn-sm " href="student.php">Ir</a></small>
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
    resultLoan(response.student.activo,response.student.vigencia);


}

function resultLoan(activo,vigencia){
    var listLoans = [];
    resultSearchStudent.innerHTML += "<hr>"
    listLoans = getLoan();
    if (listLoans.length >0){
        resultSearchStudent.innerHTML += "<p>Lista de prestamos</p>";
        console.log(tableLoan.classList);
        console.log(tableLoan.classList.remove("hide"));
        listLoans.forEach(loan => {
            contentLoanTable.innerHTML +=
            `
            <tr> 
                <td>${loan}</td>
            </tr>
            `
        });
    }else {
        resultSearchStudent.innerHTML += 
        `
        <b>No existen prestamos actualmente para este alumno </b>
        `
    }
   
}

function getLoan(){
   findLoandByStudent(numC.value);

}




cancelLoan1.onclick = ()=>{
    console.log("lol")
    resultSearchStudent.innerHTML ="";
    contentLoanTable.innerHTML = "";
    tableLoan.classList.add("hide");
}

btnLoanM.onclick =() =>{
    insertLoan(0);
}

btnLoanL.onclick =() =>{
    insertLoan(1);
}

async function insertLoan (tipo){
    let newLoan = {
        matricula: numC.value,
        ISBN : titleBookLoan.dataset.isbn,
        tipo: tipo
    };
    await swal(`Registrando prestamo ...`, {
        buttons: false,
        timer: 2000,
      })

    console.log(newLoan);

    var  response = await insertNewLoan(newLoan);
}

