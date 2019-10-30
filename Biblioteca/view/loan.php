<div class="modal fade" id="addModalLoan" tabindex="-1" role="dialog" aria-labelledby="addModalLoan" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalLoan">Préstamo</h5>
        <button type="reset" id="cancelLoan" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class= "col">
        <div class="row">
          <div class="col-12"><label id="titleBookLoan"></label></div>
        </div>
        <div class="row">
          <div class="col-8">
            <label id="authorBookLoan"></label>
          </div>
          <div class="col-4">
            <label id="amountBookLoan"></label>
          </div>
        </div>
       </div>
       <hr>
       <div class="col">
        <h5>Buscar Estudiante</h5>
        <form onsubmit="return false" >
          <div class="form-row"> 
            <div class = "col-10">
              <input type="text" id="numC"  class="form-control" placeholder="Numero Control Estudiante (8 Dig.)" pattern="[0-9]{8}" required>
            </div>
            <div class="col-2">
              <button type="submit" class="btn btn-primary" id="searchStudent">Buscar</button>
            </div>
          </div>
        </form>
        <div id= "resultSearchStudent">
        </div>
        <div>
        
            <table id="tableLoan" class="table table-bordered hide" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Fecha entrega</th>
                        <th>#</th>
                        <th>Ope</th>
                    </tr>
                </thead>
                <tbody id="contentLoanTable" > 
                    
                </tbody>
            </table>
          
        </div>
       </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="cancelLoan1" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btnLoanL" disabled>Prestar Local</button>
        <button type="button" class="btn btn-primary" id="btnLoanM" disabled>Prestar Domicilio</button>
      </div>
    </div>
  </div>
</div>