<?php
$target_dir = "../image/cover-books/"; // directorio donde se almacena la imagen 
$target_file = $target_dir . basename($_FILES["image"]["name"]); // ruta de donde se carga la imagen 

 if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file))
    echo 1;
 else 
    echo 0;

?>
