import {Book} from "./Books.interface.js";

var listBooks = new Array();

function getDataBooks (){

    return new Promise (resolve =>{
        listBooks = [
            new Book ('9788417430731','EL PROFETA Y EL JARDÍN DEL PROFETA 1','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','newBook.png',45),
            new Book ('9788417430732','EL PROFETA Y EL JARDÍN DEL PROFETA 2','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430733','EL PROFETA Y EL JARDÍN DEL PROFETA 3','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430734','EL PROFETA Y EL JARDÍN DEL PROFETA 4','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430735','EL PROFETA Y EL JARDÍN DEL PROFETA 5','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430736','EL PROFETA Y EL JARDÍN DEL PROFETA 6','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430737','EL PROFETA Y EL JARDÍN DEL PROFETA 7','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430738','EL PROFETA Y EL JARDÍN DEL PROFETA 8','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430739','EL PROFETA Y EL JARDÍN DEL PROFETA 9','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430710','EL PROFETA Y EL JARDÍN DEL PROFETA 10','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430711','EL PROFETA Y EL JARDÍN DEL PROFETA 11','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430712','EL PROFETA Y EL JARDÍN DEL PROFETA 12','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430713','EL PROFETA Y EL JARDÍN DEL PROFETA 13','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430714','EL PROFETA Y EL JARDÍN DEL PROFETA 14','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430715','EL PROFETA Y EL JARDÍN DEL PROFETA 15','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430716','EL PROFETA Y EL JARDÍN DEL PROFETA 16','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430717','EL PROFETA Y EL JARDÍN DEL PROFETA 17','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430718','EL PROFETA Y EL JARDÍN DEL PROFETA 18','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430719','EL PROFETA Y EL JARDÍN DEL PROFETA 19','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45),
            new Book ('9788417430720','EL PROFETA Y EL JARDÍN DEL PROFETA 20','GIBRAN JALIL GIBRAN',128,'Tapa blanda','ALMA EUROPA','CASTELLANO','9788417430733.jpg',45)
        ] ;
        resolve('resolve');
    })
    
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
    return Math.ceil((listBooks.length)/booksByPage)
}

export {listBooks,getDataBooks,getBooksByPage,getPages,getBooksBySearch};