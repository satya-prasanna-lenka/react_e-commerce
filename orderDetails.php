<?php
include("./connection.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM `order_details` WHERE `id` = '$id'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        echo "success";
    } else {
        echo "err";
    }
} else if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $sql = "SELECT * FROM `order_details` WHERE `email` = '$email' ";
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
        echo "No data available";
    }
} else {
    $sql = "SELECT * FROM `order_details` ";
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
        echo "No data available";
    }
}
