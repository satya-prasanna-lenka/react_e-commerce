<?php
include("./connection.php");

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $sql = "SELECT * FROM `user_signin` WHERE `email` = '$email'";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);
    if ($num > 0) {
        $sql = "SELECT * FROM `user_signin` WHERE `email` = '$email' AND `status` = 'active'";
        $result = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($result);
        if ($num > 0) {

            if ($result) {
                while ($row = mysqli_fetch_object($result)) {
                    $arr[] = $row;
                }
                echo json_encode($arr);
            } else {
                echo "err";
            }
        } else {
            echo "Please activate your account";
        }
    } else {
        echo "Email does not exist, Please register first";
    }
} else {


    $email = $_POST['email'];
    $password = $_POST['password'];


    $sql = "SELECT * FROM `user_signin` WHERE `email` = '$email'";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);
    if ($num > 0) {
        $sql = "SELECT * FROM `user_signin` WHERE `email` = '$email' AND `status` = 'active'";
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
}
