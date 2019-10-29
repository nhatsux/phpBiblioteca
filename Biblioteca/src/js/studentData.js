import {Student} from './Student.interface.js'

var listAlumns = new Array();

function findStudent (numControl){
   
  return new Promise ( async resolve =>{
    try {
      const response = await fetch("../model/GetStudent.php", {
        method: 'POST', 
        body: JSON.stringify({num_control: numControl}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json(); 
      listAlumns = json.arrStudent;  
      return resolve(json);
    } catch (error) {
      swal({
          title: "Error",
          text: `Error:(${error})`,
          icon: "error",
          button: "Ok",
          closeOnClickOutside: false
          });
    }


  });
    
      
}

async function getStudentsList(){

  return new Promise (async resolve => {
    const url = '../model/GetStudents.php';
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
      return resolve(json);
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
}





export {findStudent,getStudentsList}