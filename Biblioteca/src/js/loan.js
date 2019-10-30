async function findLoandByStudent (matricul){
    return new Promise (async resolve =>{
        const url = '../model/FindLoansByStudent.php';
        const data = {matricula: matricul}
        try{
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            //const json = await response.json();
            //return resolve(json);
        }catch (error){
            console.error('Error:', error);
        }
    })
   

}

async function insertNewLoan (newLoan){
    
    return new Promise (async resolve =>{
        const url ='../model/insertLoan.php';
        try{
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newLoan), // data can be `string` or {object}!
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            //const json = await response.json();
            //return resolve(json); 
        }catch(error){
            console.error('Error',error)
        }
    })
}

export {findLoandByStudent,insertNewLoan};