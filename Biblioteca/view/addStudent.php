<div class="modal fade" id="addModalStudent" tabindex="-1" role="dialog" aria-labelledby="addModalStudent" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalStudent">Alumno</h5>
        <button type="reset" id="cancel" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formStudent"  onsubmit="return false" >
          <div class="form-row">
              <div class="form-group col-12">
                  <label for="nameStudent">Nombre</label>
                  <input type="text" id="nameStudent" class="form-control" placeholder="Nombre del estudiante" required>
                  <label for="biding">Primer Apellido</label>
                  <input type="text" id="stApellido" class="form-control" placeholder="Primer apellido" required>
                  <label for="biding">Segundo Apellido</label>
                  <input type="text" id="ndApellido" class="form-control" placeholder="Segundo apellido" required>
                  <label for="biding">Matricula</label>
                  <input type="text" id="matricula" class="form-control" placeholder="Matricula" required>
                  <label for="biding">Vigencia</label>
                  <select class="custom-select" id="selectVigencia" required>
                    <option selected value=1>Vigente</option>
                    <option value=0>No vigente</option>
                  </select>
                  <label for="biding">Carrera</label>
                  <select class="custom-select" id="selectCarrera" required>
                    <option selected value ="" >Selecciona una carrera</option>
                    <option value=1>Sistemas Computacionales</option>
                    <option value=2>Quimica</option>
                    <option value=3>Electrica</option>
                    <option value=4>Electronica</option>
                    <option value=5>Mecanica</option>
                    <option value=6>Industrial</option>
                    <option value=7>Informatica</option>
                  </select>
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
