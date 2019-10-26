
<div class="modal fade" id="addModalBook" tabindex="-1" role="dialog" aria-labelledby="addModalBook" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalBook">title</h5>
        <button type="reset" id="cancel" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formBook"  onsubmit="return false" >
          <div class="form-row">
              <div class="form-group col-md-6">
                <img src="../src/image/icons/image.png" id="imgCover" class="mx-auto" alt="..." style="width:200px;">
                <input type="file" style="display:none;"  id="cover" accept="image/x-png,image/gif,image/jpeg"/>
              </div>
              <div class="form-group col-md-6">
                  <label for="title">Titulo</label>
                  <input type="text" id="title"  class="form-control" placeholder="No caracteres especiales" pattern="^[_A-zÀ-ÿ0-9ñÑáéíóúÁÉÍÓÚ]{2}((-|\s)*[_A-z0-9ñÑáéíóúÁÉÍÓÚ])*$" required>
                  <label for="title">Autor</label>
                  <input type="text" id="author"  class="form-control" placeholder="No caracteres especiales"  pattern="^[_A-zÀ-ÿ\.Ññ]*((-|\s)*[_A-zÑñ\.])*$" required>        
                  <label for="ISBN">ISBN</label>
                  <input type="text" id="ISBN" class="form-control" placeholder="ISBN del libro" pattern = "^[0-9]{13}$"required>
                  <label for="editorial">Editorial</label>
                  <input type="text" id="editorial" class="form-control" placeholder="Editorial del libro" pattern="^[_A-zÀ-ÿ\.Ññ]{2}((-|\s)*[_A-zÑñ\.])*$" required>
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="biding">Tipo Encuadernado</label>
                  <input type="text" id="biding" class="form-control" placeholder="Tapa dura, tapa blanda, etc ... " required>
                  <label for="biding">Lenguaje</label>
                  <input type="text" id="language" class="form-control" placeholder="Lenguaje del libro" required>
              </div>
              <div class="form-group col-md-6">
                  <label for="biding">Numero paginas</label>
                  <input type="number" id="numPages" class="form-control" placeholder="Paginas del libro" min= 1; pattern="[0-9]{2}" required>
                  <label for="biding">Cantidad</label>
                  <input type="number" id="amount" class="form-control" pattern="[0-9]{2,}" min=0 placeholder="Numero de libros existentes " required>
              </div>
          </div>
          

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btnCancel" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary" id="btnBookM">button</button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
