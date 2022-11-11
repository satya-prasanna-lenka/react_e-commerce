<?php
include("./connection.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM `admin_upload` WHERE `id` = '$id' ";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        while ($row = mysqli_fetch_object($result)) {
            $arr[] = $row;
        }
        echo json_encode($arr);
    } else {
        echo "err";
    }
} else {
    $sql = "SELECT * FROM `admin_upload` ";
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
