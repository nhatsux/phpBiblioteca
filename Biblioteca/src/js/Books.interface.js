function Book (ISBN,title,author,num_page,binding,editorial,
    language,cover,amount){
        this.ISBN = ISBN
        this.title = title;
        this.author = author;
        this.num_page = num_page;
        this.binding = binding;
        this.editorial = editorial;
        this.language = language;
        this.cover = cover;
        this.amount = amount;
}

export {Book};
