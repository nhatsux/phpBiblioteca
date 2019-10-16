import {item_modal} from './books.js'


imgCover.onclick  = ()=> { cover.click()}



document.onclick= ()=> {
    console.log(item_modal)
 if (item_modal != undefined){
    switch (item_modal.name) {
        case "edit":
             activeForm();
             btnBookM.innerHTML = "Editar"; titleModalBook.innerHTML="Editar Libro"
             fillFormEdit();
             ISBN.disabled = true;
            break;
        case "delete":
             btnBookM.innerHTML = "Borrar"; titleModalBook.innerHTML="Borrar Libro"
             fillFormEdit();
             disabledForm();
        break;
        case "add":
             btnBookM.innerHTML = "agregar"; titleModalBook.innerHTML="Agregar Libro"; 
             activeForm();
             emptyForm();
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
}

function disabledForm(){
    
    title.disabled = true;
    author.disabled = true;
    ISBN.disabled = true;
    editorial.disabled = true;
    biding.disabled = true;
    language.disabled = true;
    numPages.disabled = true;
    amount.disabled = true;
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
}


