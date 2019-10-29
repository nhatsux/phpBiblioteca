import {getStudentsList,findStudent} from './studentData.js'
var responseAlumns;
async function buildViemstudents (){
    responseAlumns= await getStudentsList();
    builContentTable(responseAlumns.arrStudent);
}

function builContentTable(listAlumns){
    tableStudentBody.innerHTML ="";
    if (responseAlumns.successful){
        listAlumns.forEach(alumn => {
            tableStudentBody.innerHTML+=
            `
            <tr class = ${alumn.activo?"bg-danger":alumn.vigencia?"":"bg-warning"}> 
                <td>${alumn.matricula}</td>
                <td>${alumn.nombre} ${alumn.apePaterno} ${alumn.apeMaterno}</td>
                <td>${alumn.carrera}</td>
                <td> 
                    <div class="row">
                        <div class="col-6">
                            <img  data-student= "${alumn.matricula}" class="edit btn btn-primary btn-sm "  title="Editar alumno"  src="../src/image/icons/edit.png" data-toggle="modal" data-target="#addModalStudent">
                        </div>
                        <div class="col-6">
                            <img class="loan btn btn-success btn-sm "  title= "Prestamos"  src="../src/image/icons/loan.png" data-toggle="modal" data-target="#addModalLoan">
                        </div>            
                    </div>
                </td>
            </tr> 
            `
        });
    }
}

function filterAlumns (filter){
    return responseAlumns.arrStudent.filter(alumn => {
      return alumn.nombre.replace(/ /g,"").toUpperCase().includes(filter.replace(/ /g,"").toUpperCase().trim())|| 
      alumn.matricula.includes(filter.trim()) ||
      alumn.carrera.replace(/ /g,"").toUpperCase().includes(filter.replace(/ /g,"").toUpperCase().trim())
    })
  }

searchInput.onkeyup = () =>{
    builContentTable(filterAlumns(searchInput.value));
}

tableStudentBody.onclick = e =>{
    if (e.target.tagName === "IMG"){
        switch (e.target.classList[0]) {
            case "edit":
                btnStudentM.innerHTML = "Editar Alumno"
                buildModal(e.target.dataset.student);
                break;
        
            default:
                break;
        }
    }
       
}

function buildModal(student){
    var alumn = responseAlumns.arrStudent.find(element => element.matricula === student);
    console.log(alumn.nombre)
    nameStudent.value = alumn.nombre;
}



buildViemstudents();