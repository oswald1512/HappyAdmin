<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier origen
header("Content-Type: application/json; charset=UTF-8");

// Conexión a la base de datos
$servername = "localhost";  // Cambia por tu servidor
$username = "root";         // Cambia por tu usuario
$password = "";             // Cambia por tu contraseña
$dbname = "happyadmin";   // Nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para obtener los platos
$sql = "SELECT idPush, detalleProducto, nombreCompleto, fotoCarnet, fotoSelfie, direccion, telefono, estado FROM data";
$result = $conn->query($sql);

// Arreglo para almacenar los resultados
$dishes = array();

if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        $dishes[] = $row;
    }
} else {
    echo json_encode(["message" => "No se encontraron datos"]);
}

// Enviar el resultado como JSON
echo json_encode($dishes);

// Cerrar la conexión
$conn->close();
?>