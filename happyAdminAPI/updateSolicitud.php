<?php
// updateUser.php
// Mostrar todos los errores PHP (solo en desarrollo, para producción, desactiva esto)
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// Configuración de conexión a la base de datos
$servername = "localhost"; // o la IP de tu servidor
$username = "root"; // tu usuario de base de datos
$password = ""; // tu contraseña de base de datos
$dbname = "happyadmin"; // el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

ob_clean();

// Establecer encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Obtener datos de la solicitud
$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

// Obtener los datos necesarios
$idPush = $decodedData['idPush'] ?? null;
$estado = $decodedData['estado'] ?? null;

// Verificar si el ID es válido
if ($idPush === null) {
    echo json_encode(["Message" => "ID no proporcionado."]);
    exit;
}

// Actualizar el usuario en la base de datos
$stmt = $conn->prepare("UPDATE data SET estado = ? WHERE idPush = ?");
$stmt->bind_param("si", $estado, $idPush);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["Message" => "Actualización exitosa."]);
    } else {
        echo json_encode(["Message" => "No se encontraron cambios."]);
    }
} else {
    echo json_encode(["Message" => "Error al actualizar: " . $stmt->error]);
}

$stmt->close();
$conn->close();

?>