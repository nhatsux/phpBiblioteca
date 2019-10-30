import {getLoansList} from './loansData.js'
var responseLoans;
async function buildViewloans (){
    responseLoans= await getLoansList();
    builContentTable(responseLoans.arrLoans);
    builFiltersForm(responseLoans.arrLoans);
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
    var filtro = {};
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

buildViewloans ();