<?php
session_start();
include 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['error' => 'Not logged in']);
  exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$userid = $_SESSION['user_id'];
$firstname = $data['firstname'];
$lastname = $data['lastname'];
$dateofbirth = $data['dateofbirth'];
$gender = $data['gender'];
$email = $data['email'];
$phone = $data['phone'];
$address = $data['address'];

$query = $mysqli->prepare("UPDATE `student` SET `firstname` = ?, `lastname` = ?, `dateofbirth` = ?, `gender` = ?, `email` = ?, `phone` = ?, `address` = ? WHERE `userid`=?");
$query->bind_param('sssssssi', $firstname, $lastname, $dateofbirth, $gender, $email, $phone, $address, $userid);

if ($query->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['error' => 'Failed to update profile']);
}
