<?php
include("./connection.php");

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$token = bin2hex(random_bytes(15));
$pass = password_hash($password, PASSWORD_BCRYPT);

$sql = "SELECT * FROM `user_signin` WHERE `email` = '$email'";
$result = mysqli_query($conn, $sql);
$num = mysqli_num_rows($result);
if ($num == 0) {

    $email_to = "$email";
    $subject = "Email activation";
    $body = "Hi,$name  click here to active your acount
            http://localhost/all/shopnow/activation.php?token=$token";
    $headers = "From : webtechd7@gmail.com";



    if (mail($email_to, $subject, $body, $headers)) {

        $sql = "INSERT INTO `user_signin` (`id`, `name`, `email`, `password`, `token`, `status`) VALUES (NULL, '$name', '$email', '$pass', '$token', 'inactive')";

        $result = mysqli_query($conn, $sql);
        if ($result) {
            echo "Success";
        } else {
            echo "Error";
        }
    } else {
        echo "Email sending failed please check your network connection🗼or choose a valid email";
    }
} else {
    echo json_encode(['type' => 'Email already exist']);
}
