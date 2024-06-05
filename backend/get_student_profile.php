<?php
session_start();
include 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$userid = $_SESSION['user_id'];
$query = $mysqli->prepare("SELECT * FROM `student` WHERE `userid` = ?");
$query->bind_param('i', $userid);
$query->execute();
$result = $query->get_result(); 
$data = $result->fetch_assoc();

echo json_encode($data);