<?php
include("./connection.php");
if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $sql = "UPDATE `user_signin` SET `status` = 'active' WHERE `token`='$token'";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        if ($result) {
            echo "email Updated";
        }
    } else {
        echo "Failed";
    }
}
