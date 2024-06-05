<?php
require 'config.php';
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$username = $mysqli->real_escape_string($input['username']);
$password = $input['password'];

$stmt = $mysqli->prepare('SELECT `userid`, `password` FROM `appuser` WHERE `username` = ?');
if ($stmt) {
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);

    if ($stmt->num_rows > 0) {
        $stmt->fetch();
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => $mysqli->error]);
}

$mysqli->close();
?>
