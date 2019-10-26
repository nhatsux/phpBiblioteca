import {getPages,getDataBooks,getBooksByPage,getBooksBySearch, listBooks}from './books.data.js';
var num_books = 0;
var booksItemsPages= new Array();
var num_pages = 0;
var items_pagination = 0;
var item_modal;

async function buildViewBooks(update){
    deck.innerHTML = "";
    if (window.innerWidth <=970){
        searchMobile.classList.remove("hide");
        searchMobileBtn.classList.remove("hide");
        search.elements[0].style.display = "none"
        num_books = 6;
        items_pagination = 5;
    }else if(window.innerWidth >1525) {
        searchMobile.classList.add("hide");
        searchMobileBtn.classList.add("hide");
        search.elements[0].style.display = "block"
        num_books = 16;
        items_pagination = 12;
    } else {
        searchMobile.classList.add("hide");
        searchMobileBtn.classList.add("hide");
        search.elements[0].style.display = "block"
        num_books = 12;
        items_pagination = 12;
    }  
    
    if (booksItemsPages.length == 0 || update){
       await getDataBooks();
    }  
    num_pages = getPages(num_books);
    createPagination(items_pagination);
    getBookCurrentPage(1);
}
 
function getBooks(){
    if (booksItemsPages.length >0){
        booksItemsPages.forEach(book=> {
           
            deck.innerHTML += 
            `
            <div class="card mb-2" >
                <div class="row no-gutters">
                    <div class="col-md-6" >
                        <img src="../src/image/cover-books/${book.cover}" class="card-img" alt="...">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body" style="height:75%;">
                            <p class="title">${book.title}</p>
                            <p class="info">ISBN: ${book.ISBN}</p>
                            <p class="info">AUTOR: ${book.author}</p>
                            
                           
                        </div>
                        <div class= "card-footer" data-book= "${book.ISBN}">
                        <img class="edit btn btn-primary btn-sm "  title="Editar"  src="../src/image/icons/edit.png" data-toggle="modal" data-target="#addModalBook">
                        <img class="loan btn btn-success btn-sm "  title= "Prestar"  src="../src/image/icons/loan.png" data-toggle="modal" data-target="#addModalLoan">
                        </div>
                    </div>
                </div>
            </div>
            `
        });
    }
}
function createPagination (limit){
    pages.innerHTML ="";
    pages.innerHTML += 
    `
    <li class="page-item">
        <a class="page-link" tabindex="-1">Anterior</a>
    </li>
    `

    for (let index = 1; index <= num_pages && index <= limit; index++) {
        if (index == 1 )
            pages.innerHTML+=
            `
            <li class="page-item  active"><a class="page-link" >${index}</a></li>
            ` 
        else 
            pages.innerHTML += 
            `
            <li class="page-item"><a class="page-link">${index}</a></li>
            ` 
        

    }
    pages.innerHTML += 
    `
    <li class="page-item">
        <a class="page-link"  tabindex="-1">Siguiente</a>
    </li>
    `

}

async function getBookCurrentPage (page){
        booksItemsPages = await getBooksByPage(num_books,page)
        deck.innerHTML ="";
        getBooks();
}



pages.onclick = function (e){
    
    switch (e.target.innerHTML) {
        case 'Siguiente':
            console.log('next')
            break;
        case 'Anterior':
            console.log('before')
            break;
        default:
            pages.querySelectorAll('.active').forEach(element => {
                element.classList.remove("active");
            });
            pages.getElementsByTagName("li")[e.target.innerHTML].classList.add("active")
            getBookCurrentPage(e.target.innerHTML)

            break;

    }
}

searchInput.onkeyup = function (){
    booksItemsPages = getBooksBySearch(searchInput.value);
    deck.innerHTML ="";
    getBooks();
}

searchMobileBtn.onclick = function (){
    if (searchMobile.value.trim()!= ""){
        booksItemsPages = getBooksBySearch(searchMobile.value);
         deck.innerHTML ="";
        getBooks();
    }
    
}

deck.onclick= e =>{
    if (e.target.classList[0] == "edit" || e.target.classList[0] == "loan" ){
        
        var isbn = e.target.parentNode.dataset.book;
        item_modal = {
            name: e.target.classList[0],
            book:booksItemsPages.find(book => book.ISBN === isbn)
        }
        console.log(item_modal)
    }
}

buildViewBooks(false);
window.onresize = () =>{ 
    if (window.innerWidth >=970)
        buildViewBooks(false)
    };
export {item_modal,buildViewBooks}
