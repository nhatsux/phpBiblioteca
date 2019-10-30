async function findLoandByStudent (matricul){
    return new Promise (async resolve =>{
        const url = '../model/GetLoanM.php';
        const data = {matricula: matricul}
        try{
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            const json = await response.json();
            return resolve(json.arrLoan);
        }catch (error){
            console.error('Error:', error);
        }
    })
   

}

async function insertNewLoan (newLoan){
    
    return new Promise (async resolve =>{
        const url ='../model/AddLoan.php';
        try{
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newLoan), // data can be `string` or {object}!
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            const json = await response.json();
            return resolve(json); 
        }catch(error){
            console.error('Error',error)
        }
    })
}

export {findLoandByStudent,insertNewLoan};