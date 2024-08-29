<?php
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

$mysqli = new mysqli('localhost', 'daian', 'daian', 'crud_example');

if ($mysqli->connect_error) {
    http_response_code(500);
    exit('Error al conectar a la base de datos');
}

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM usuarios";
        $result = $mysqli->query($sql);
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;
    case 'POST':
        $sql = "INSERT INTO usuarios (name, email) VALUES ('{$input['name']}', '{$input['email']}')";
        $mysqli->query($sql);
        break;
    case 'PUT':
        if ($id) {
            $sql = "UPDATE usuarios SET name='{$input['name']}', email='{$input['email']}' WHERE id=$id";
            $mysqli->query($sql);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
        }
        break;
    case 'DELETE':
        if ($id) {
            $sql = "DELETE FROM usuarios WHERE id=$id";
            $mysqli->query($sql);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

$mysqli->close();
?>
