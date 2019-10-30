import {getLoansList, getTables} from './loansData.js'
var responseLoans;
var loansFilter;
var filtro;
var tables;

var i = 0;
async function buildViewloans (){
    responseLoans= await getLoansList();
    builContentTable(responseLoans.arrLoans);
    builFiltersForm(responseLoans.arrLoans);
}

async function buildTables (){
    tables= await getTables();
}

function builContentTable(listLoans){
    tableLoansBody.innerHTML ="";
    if (responseLoans.successful){
        listLoans.forEach(loan => {
            tableLoansBody.innerHTML+=
            `
            <tr class = ${loan.estado ? "" : "bg-danger"}> 
                <td>${loan.matricula}</td>
                <td>${loan.ISBN}</td>
                <td>${loan.refrendo}</td>
                <td>${loan.fechaIni}</td>
                <td>${loan.fechaFin}</td>
                <td>${loan.estado ? "Activo" : "Adeudo"}</td>
                <td>${loan.tipo ? "Local" : "A Casa"}</td>
                <td> 
                    <div class="row">
                        <div class="col-6">
                            <img  data-loan= "${loan.matricula}-${loan.ISBN}" class="edit btn btn-primary btn-sm "  title="Editar Prestamo"  src="../src/image/icons/edit.png" data-toggle="modal" data-target="#addModalLoan">
                        </div>           
                    </div>
                </td>
            </tr> 
            `
        });
    }
}

function builFiltersForm(listLoans){
    controls.innerHTML ="";
    if (responseLoans.successful){
        
        var matriculas = listLoans.map(l => l.matricula);
        var uniqueMat = matriculas.filter((v,i) => matriculas.indexOf(v) === i);
        var matOptions = "";

        var isbns = listLoans.map(l => l.ISBN);
        var uniqueIsbns = isbns.filter((v,i) => isbns.indexOf(v) === i);
        var isbnOptions = "";

        uniqueMat.forEach(function(e) {
            matOptions += '<option value="' + e + '">' + e + '</option>';
        });
          
        uniqueIsbns.forEach(function(e) {
            isbnOptions += '<option value="' + e + '">' + e + '</option>';
        });

        controls.innerHTML+=
        `
        <div class="form-group">
            <label for="matricula">Matricula</label>
            <select class="form-control" name="matricula" id="matricula">
            <option value=""></option>
        ` + matOptions + 
        `
            </select>
        </div>
        <div class="form-group">
            <label for="ISBN">ISBN</label>
            <select class="form-control" name="ISBN" id="ISBN">
            <option value=""></option>
        `+ isbnOptions +
        `
            </select>
        </div>
        <div class="form-group">
            <label for="refrendo">Refrendo</label>
            <select class="form-control" name="refrendo" id="refrendo">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
        <div class="form-group">
            <label for="fechaIni">Fecha Inicio</label>
            <input type="date" name="fechaIni" id="fechaIni">
        </div> 
        <div class="form-group">
        <label for="fechaFin">Fecha Inicio</label>
            <input type="date" name="fechaFin" id="fechaFin">
        </div> 
        <div class="form-group">
            <label for="estado">Estado</label>
            <select class="form-control" name="estado" id="estado">
                <option value=""></option>
                <option value="1">Activo</option>
                <option value="0">Adeudo</option>
            </select>
        </div>
        <div class="form-group">
            <label for="tipo">Tipo</label>
            <select class="form-control" name="tipo" id="tipo">
                <option value=""></option>
                <option value="1">Local</option>
                <option value="0">A Casa</option>
            </select>
        </div>
        `
    }
}

btnFilter.onclick = () =>{
    filtro = {};
    var frm = document.forms["customFilter"];

    filtro["matricula"] =   frm["matricula"].value;
    filtro["ISBN"] =        frm["ISBN"].value;
    filtro["refrendo"] =    frm["refrendo"].value;
    filtro["fechaIni"] =    frm["fechaIni"].value;
    filtro["fechaFin"] =    frm["fechaFin"].value;
    filtro["estado"] =      frm["estado"].value;
    filtro["tipo"] =        frm["tipo"].value;

    if (responseLoans.successful){

        //words.filter(word => word.length > 6);
        var applyFilter = responseLoans.arrLoans.map(l=>l);

        if(filtro["matricula"])
            applyFilter = applyFilter.filter(l => l.matricula == filtro["matricula"] );
        
        if(filtro["ISBN"])
            applyFilter = applyFilter.filter(l => l.ISBN == filtro["ISBN"] );
        
        if(filtro["refrendo"])
            applyFilter = applyFilter.filter(l => l.refrendo == filtro["refrendo"] );
        
        if(filtro["fechaIni"])
            applyFilter = applyFilter.filter(l => l.fechaIni == filtro["fechaIni"] );
        
        if(filtro["fechaFin"])
            applyFilter = applyFilter.filter(l => l.fechaFin == filtro["fechaFin"] );
        
        if(filtro["estado"])
            applyFilter = applyFilter.filter(l => l.estado == filtro["estado"] );
        
        if(filtro["tipo"])
            applyFilter = applyFilter.filter(l => l.tipo == filtro["tipo"] );
        
  
        console.log(applyFilter);
        builContentTable(applyFilter);
        loansFilter = applyFilter;
    }



}

function filterLoans (filter){
    return responseLoans.arrLoans.filter(loan => {
      return loan.matricula.includes(filter.trim()) 
      || loan.ISBN.includes(filter.trim()) 
      || loan.fechaIni.includes(filter.trim())
      || loan.fechaFin.includes(filter.trim())
      || loan.estado == (filter.trim().toLowerCase() == "activo" ? 1 : filter.trim().toLowerCase() == "adeudo" ? 0 : NaN)
      || loan.tipo == (filter.trim().toLowerCase() == "local" ? 1 : filter.replace(/ /g,"").toLowerCase() == "acasa" ? 0 : NaN)
    })
  }

searchInput.onkeyup = () =>{
    builContentTable(filterLoans(searchInput.value));
}

tableLoansBody.onclick = e =>{
    if (e.target.tagName === "IMG"){
        switch (e.target.classList[0]) {
            case "edit":
                btnLoanM.innerHTML = "Editar Prestamo"
                buildModal(e.target.dataset.loan);
                break;
        
            default:
                break;
        }
    }
       
}

function buildModal(loan){
    var loan = responseLoans.arrLoans.find(element => (element.matricula + "-" + element.ISBN) === loan);
    console.log(element.matricula + "-" + element.ISBN);
    nameStudent.value = element.matricula + "-" + element.ISBN;
}

btnShowFilter.onclick = () =>{
    filters.classList.toggle('openFilter');
    tableLoans.classList.toggle('tableOpenFilter');
}

btnReporte.onclick = () =>{
    var headers = {
    matricula: "Matricula",
    ISBN :"ISBN",
    refrendo : "Refrendo",
    fechaIni :"Fecha Inicio",
    fechaFin :"Fecha Fin",
    estado: "Estado",
    tipo : "Tipo"
    }
    var fecha = new Date();
    
    var datos = loansFilter ? loansFilter.map(l=>l) : responseLoans.arrLoans.map(l=>l);
    var titulo = "Reporte de Prestamos: " + (filtro ? JSON.stringify(filtro) : "")
    exportCSVFile(headers,datos,fecha, titulo);

}

btnReporteGlobal.onclick = () =>{
    var headersStudents = {
        matricula:    "matricula",
        nombre:       "nombre",
        apePaterno:   "apePaterno",
        apeMaterno:   "apeMaterno",
        activo:       "activo",
        vigencia:     "vigencia",
        id_carrera:      "id_carrera",
    }

    var headersLoans = {
        matricula:"matricula",
        ISBN :"ISBN",
        refrendo : "Refrendo",
        fechaIni :"Fecha Inicio",
        fechaFin :"Fecha Fin",
        estado: "Estado",
        id_deuda: "id_deuda",
        tipo : "Tipo"
    }

    var headersBooks = {
        ISBN :"ISBN",
        titulo : "titulo",
        autor :"autor",
        num_page : "num_page",
        encuadernacion :"encuadernacion",
        editorial :"editorial",
        lengua :"lengua",
        portada :"portada",
        cantidad :"cantidad"
    }
    var fecha = new Date();
    
    if (tables.successful){
        var arrStudent = tables.arrStudent;
        var arrBook = tables.arrBook;
        var arrLoan = tables.arrLoan;
        var titulo = " ";


        var reporte = exportCSVFile(headersStudents,arrStudent,fecha,titulo);
        reporte += exportCSVFile(headersLoans,arrBook,fecha,titulo);
        reporte += exportCSVFile(headersBooks,arrLoan,fecha,titulo);

        exportGlobalCSVFile("Reporte Global",reporte);
    }


}


function convertToCSV(objArray, titulo) {
    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = titulo + " \r\n\r\n";
   
   for (let i = 0; i < array.length; i++) {
     let line = "";
     for (let index in array[i]) {
      if (line != "") line += ",";
   
   line += array[i][index];
     }
   
   str += line + "\r\n";
    }
   
   return str;
}

function exportCSVFile(headers, items, fileName, titulo) {
    if (headers) {
     items.unshift(headers);
    }
   
   const jsonObject = JSON.stringify(items);
   
   const csv = convertToCSV(jsonObject, titulo);
   
   const exportName = fileName + ".txt" || "export.txt";
   
   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
     navigator.msSaveBlob(blob, exportName);
    } else {
     const link = document.createElement("a");
     if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     }
    }
    
}


function exportGlobalCSVFile(fileName,rows) {
    
   const exportName = fileName + ".txt" || "export.txt";
   
   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
     navigator.msSaveBlob(blob, exportName);
    } else {
     const link = document.createElement("a");
     if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     }
    }
    
}


buildViewloans ();
buildTables();