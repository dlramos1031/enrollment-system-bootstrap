<?php
require 'config.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$username = $mysqli->real_escape_string($input['username']);
$email = $mysqli->real_escape_string($input['email']);
$password = password_hash($input['password'], PASSWORD_DEFAULT);

$stmt = $mysqli->prepare('INSERT INTO `appuser` (`username`, `email`, `password`) VALUES (?, ?, ?)');
if ($stmt) {
    $stmt->bind_param('sss', $username, $email, $password);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to execute statement.']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => $mysqli->error]);
}

$mysqli->close();
?>
