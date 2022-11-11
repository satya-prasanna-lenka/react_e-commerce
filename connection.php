<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
// header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
header("connection:keep-alive");
$server = "localhost";
$username = "root";
$password = "";
$database = "shopnow";

$conn = mysqli_connect($server, $username, $password, $database);

// if ($conn) {
//     echo "success";
// } else {
//     echo "error";
// }
