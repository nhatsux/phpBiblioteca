
async function getLoansList(){

  return new Promise (async resolve => {
    const url = '../model/GetLoans.php';
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

export {getLoansList}