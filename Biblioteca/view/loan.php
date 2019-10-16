<div class="modal fade" id="addModalLoan" tabindex="-1" role="dialog" aria-labelledby="addModalLoan" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalLoan">title</h5>
        <button type="reset" id="cancelLoan" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formBook">
          <div class="form-row">
              <div class="form-group col-md-6">
                <img src="../src/image/icons/image.png" id="imgCover" class="mx-auto" alt="..." style="width:200px;">
                <input type="file" style="display:none;" id="cover" accept="image/x-png,image/gif,image/jpeg"/>
              </div>
              <div class="form-group col-md-6">
                  <label for="title">Titulo</label>
                  <input type="text" id="title"  class="form-control" placeholder="Titulo del libro">
                  <label for="title">Autor</label>
                  <input type="text" id="author"  class="form-control" placeholder="Autor del libro">        
                  <label for="ISBN">ISBN</label>
                  <input type="text" id="ISBN" class="form-control" placeholder="ISBN del libro">
                  <label for="editorial">Editorial</label>
                  <input type="text" id="editorial" class="form-control" placeholder="Editorial del libro">
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="biding">Tipo Encuadernado</label>
                  <input type="text" id="biding" class="form-control" placeholder="Tapa dura, tapa blanda, etc ... ">
                  <label for="biding">Lenguaje</label>
                  <input type="text" id="language" class="form-control" placeholder="Lenguaje del libro">
              </div>
              <div class="form-group col-md-6">
                  <label for="biding">Numero paginas</label>
                  <input type="number" id="numPages" class="form-control" placeholder="Paginas del libro ">
                  <label for="biding">Cantidad</label>
                  <input type="number" id="amount" class="form-control" placeholder="Numero de libros existentes ">
              </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnCancel" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btnLoanM">button</button>
      </div>
    </div>
  </div>
</div>