import {getLoansList} from './loansData.js'
var responseLoans;
async function buildViewloans (){
    responseLoans= await getLoansList();
    builContentTable(responseLoans.arrLoans);
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
                <td>${loan.tipo}</td>
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


function filterLoans (filter){
    return responseLoans.arrLoans.filter(loan => {
      return loan.matricula.includes(filter.trim()) 
      || loan.ISBN.includes(filter.trim()) 
      || loan.fechaIni.includes(filter.trim())
      || loan.fechaFin.includes(filter.trim())
      || loan.estado == (filter.trim() == "Activo" ? 1 : filter.trim() == "Adeudo" ? 0 : NaN)
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

buildViewloans ();