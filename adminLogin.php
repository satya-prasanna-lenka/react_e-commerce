<?php
include("./connection.php");


$email = $_POST['email'];
$password = $_POST['password'];


$sql = "SELECT * FROM `admin_login` WHERE `email` = '$email'";
$result = mysqli_query($conn, $sql);
$num = mysqli_num_rows($result);
if ($num > 0) {
    $sql = "SELECT * FROM `admin_login` WHERE `email` = '$email' AND `status` = 'active'";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);
    if ($num > 0) {

        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            echo "success";
        } else {
            echo "Please put correct password";
        }
    } else {
        echo "Please activate your account";
    }
} else {
    echo "Email does not exist, Please register first";
}
