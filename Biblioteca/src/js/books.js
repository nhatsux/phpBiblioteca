import {getPages,getDataBooks,getBooksByPage,getBooksBySearch}from './books.data.js';
var num_books = 0;
var booksItemsPages= new Array();
var num_pages = 0;
var items_pagination = 0;
var item_modal;

async function buildViewBooks(){
    deck.innerHTML = "";
    if (window.innerWidth <=810){
        searchMobile.classList.remove("hide");
        num_books = 6;
        items_pagination = 5;
    }else if(window.innerWidth >1525) {
        searchMobile.classList.add("hide");
        num_books = 18;
        items_pagination = 12;
    } else {
        searchMobile.classList.add("hide");
        num_books = 8;
        items_pagination = 12;
    }  
    
    if (booksItemsPages.length == 0){
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
                            <p class="title text-center">${book.title}</p>
                            <p class="info">ISBN: ${book.ISBN}</p>
                            <p class="info">AUTOR: ${book.author}</p>
                            <p class="info">EDITORIAL: ${book.editorial}</p>
                           
                        </div>
                        <div class= "card-footer" data-book= "${book.ISBN}">
                        <img class="edit btn btn-primary btn-sm "  style="width: 40px;" src="../src/image/icons/edit.png" data-toggle="modal" data-target="#addModalBook">
                        <img class="delete btn btn-danger btn-sm " style="width: 40px;" src="../src/image/icons/delete.png" data-toggle="modal" data-target="#addModalBook">
                        <img class="loan btn btn-success btn-sm "  style="width: 40px;" src="../src/image/icons/edit.png">
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

buildViewBooks();

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

search.onkeyup = function (){
    booksItemsPages = getBooksBySearch(search.value);
    deck.innerHTML ="";
    getBooks();
}

searchMobile.onkeyup = function (){
    booksItemsPages = getBooksBySearch(searchMobile.value);
    deck.innerHTML ="";
    getBooks();
}

deck.onclick= e =>{

    var isbn = e.target.parentNode.dataset.book;
    item_modal = {
        name: e.target.classList[0],
        book:booksItemsPages.find(book => book.ISBN === isbn)
    }
}

addBook.onclick  = ()=> {
    item_modal = {
        name: "add"
    }
}
window.onresize = buildViewBooks;
export {item_modal}
