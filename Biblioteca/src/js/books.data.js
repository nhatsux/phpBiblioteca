import {Book} from "./Books.interface.js";

var listBooks = new Array();

 async function getDataBooks (){

    const url = '../model/GetBooks.php';
    const data = { peticion: 'example' };
    
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      listBooks = json.arrBook;
    } catch (error) {
      console.error('Error:', error);
    }
        
}

function getBooksByPage(amount,page){
   
    return new Promise (resolve =>{
        let items = amount *page;
        let init = (items - (amount));
        var arrayTemp = new Array();
        for (; init < items; init++) {
            if (listBooks[init]!= undefined)
                arrayTemp.push(listBooks[init]);        
        }
        resolve(arrayTemp);
    })
   
}

function getBooksBySearch(search){
    return listBooks.filter(book => { 
        return book.title.replace(/ /g,"").includes(search.replace(/ /g,"").toUpperCase().trim())|| 
        book.ISBN.includes(search.trim())
    }).slice(0,8);
}

function getPages (booksByPage){
    console.log(listBooks.length)
    return Math.ceil((listBooks.length)/booksByPage)
}

function setListBooks (array){
 listBooks = array;
}

export {listBooks,getDataBooks,getBooksByPage,getPages,getBooksBySearch,setListBooks};