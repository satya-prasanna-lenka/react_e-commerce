<?php
include("./connection.php");
if (isset($_GET['delete'])) {
    $delete = $_GET['delete'];
    $sql = "DELETE FROM `admin_upload` WHERE `id` = '$delete'";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo "Success";
    } else {

        echo "Something went wrong";
    }
}
