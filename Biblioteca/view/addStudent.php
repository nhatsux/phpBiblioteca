<div class="modal fade" id="addModalStudent" tabindex="-1" role="dialog" aria-labelledby="addModalStudent" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalBook">Estudiante</h5>
        <button type="reset" id="cancel" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formBook"  onsubmit="return false" >
          <div class="form-row">
              <div class="form-group col-12">
                  <label for="nameStudent">Nombre</label>
                  <input type="text" id="nameStudent" class="form-control" required>
                  <label for="biding">Lenguaje</label>
                  <input type="text" id="language" class="form-control" placeholder="Lenguaje del libro" required>
              </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btnCancel" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary" id="btnStudentM">button</button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
