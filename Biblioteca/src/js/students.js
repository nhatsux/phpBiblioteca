import {getStudentsList,findStudent,addAlumn,editStudent} from './studentData.js'
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
                btnStudentM.innerHTML = "Editar Alumno";
                matricula.disabled = true;
                buildModal(e.target.dataset.student);
                break;
        
            default:
                break;
        }
    }
       
}

function findAlumnByMatricula (matri){
    return  responseAlumns.arrStudent.find(element => element.matricula === matri);
}


function buildModal(student){
    var alumn = findAlumnByMatricula(student);
    console.log(alumn.nombre)
    nameStudent.value = alumn.nombre;
    stApellido.value = alumn.apePaterno;
    ndApellido.value = alumn.apeMaterno;
    matricula.value = alumn.matricula;
    selectVigencia.value = alumn.vigencia;
    selectCarrera.value = alumn.id_carrera;
}

function emptyForm(){
    nameStudent.value = "";
    stApellido.value = "";
    ndApellido.value = "";
    matricula.value = "";
    selectVigencia.selectedIndex = 0;
    selectCarrera.selectedIndex = 0;
    matricula.disabled = false;
}

addStudent.onclick =()=>{
    emptyForm();
    btnStudentM.innerHTML = "Agregar Alumno";
}

btnStudentM.onclick =async  ()=>{
    if (validatorFormStudent()){
        let alumn = createDataalumn();
        let response;
        console.log(alumn);
        switch (btnStudentM.innerHTML) {

            case "Editar Alumno":
                response = await editStudent(alumn);
                 await swal(`Editando Alumno...`, {
                    buttons: false,
                    timer: 1000,
                    })
            break;
            case "Agregar Alumno":
                  response = await addAlumn(alumn);
                    await swal(`Registrando Alumno ...`, {
                        buttons: false,
                        timer: 1000,
                        })
            break;
            default:
                break;
        }
        responseOpeAlumn(response);
    }
    
}

async function responseOpeAlumn(response){
    if (response.successful){
         await swal({
            title: "Exito",
            text: `${response.msj}`,
            icon: "success",
            button: "Ok",
            closeOnClickOutside: false,
            timer: 2000
            });
            buildViemstudents();
            btnCancel.click();
    }else {
        swal({
            title: "Error",
            text:  `${response.msj}`,
            icon: "error",
            button: "Ok",
            closeOnClickOutside: false
            });
    }
}

function createDataalumn(){
    return {matricula: matricula.value,
            nombre: nameStudent.value,
            apePaterno: stApellido.value,
            apeMaterno: ndApellido.value,
            vigencia: parseInt(selectVigencia.value),
            id_carrera: parseInt(selectCarrera.value)
            }
}


function validatorFormStudent(){
    var isFull = true;
    for (const item of formStudent.elements) {
        if (item.type != "file" && item.type != "button" && item.type != "submit" ){ 
            if(item.value==="" ){
                isFull = false;
                swal({
                    title: "Error",
                    text: "Revisar Informacion",
                    icon: "warning",
                    button: "Ok",
                    closeOnClickOutside: false
                    
                    });
            }
            
        }        
    }
    
return isFull;
}


buildViemstudents();