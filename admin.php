<?php
include("./connection.php");



if (isset($_GET['edit'])) {

    $id = $_GET['edit'];

    $name = $_POST['name'];
    $dPrice = $_POST['dPrice'];
    $sPrice = $_POST['sPrice'];
    $disc = $_POST['disc'];
    $catagory = $_POST['catagory'];

    $choosedMain = $_FILES['choosedMain']['name'];
    $pdf_type = $_FILES['choosedMain']['type'];
    $pdf_size = $_FILES['choosedMain']['size'];
    $pdf_tem_loc = $_FILES['choosedMain']['tmp_name'];
    $pdf_store = "shopnow/src/photos/" . $choosedMain;
    move_uploaded_file($pdf_tem_loc, $pdf_store);
    if ($choosedMain) {
        $sql = "UPDATE `admin_upload` SET `name` = '$name',`dPrice`='$dPrice',`sPrice`='$sPrice',`disc`='$disc',`catagory`='$catagory',`mainImage`='$choosedMain' WHERE `admin_upload`.`id` = '$id'";

        $result = mysqli_query($conn, $sql);
        if ($result) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        $sql = "UPDATE `admin_upload` SET `name` = '$name',`dPrice`='$dPrice',`sPrice`='$sPrice',`disc`='$disc',`catagory`='$catagory' WHERE `admin_upload`.`id` = '$id'";

        $result = mysqli_query($conn, $sql);
        if ($result) {
            echo "success";
        } else {
            echo "error";
        }
    }
} else {
    $name = $_POST['name'];
    $dPrice = $_POST['dPrice'];
    $sPrice = $_POST['sPrice'];
    $disc = $_POST['disc'];
    $catagory = $_POST['catagory'];
    // $mainImage = $_POST['mainImage'];
    // $subImage1 = $_POST['subImage1'];
    // $subImage2 = $_POST['subImage2'];




    $mainImage = $_FILES['mainImage']['name'];
    $pdf_type = $_FILES['mainImage']['type'];
    $pdf_size = $_FILES['mainImage']['size'];
    $pdf_tem_loc = $_FILES['mainImage']['tmp_name'];
    $pdf_store = "shopnow/src/photos/" . $mainImage;
    move_uploaded_file($pdf_tem_loc, $pdf_store);

    $subImage1 = $_FILES['subImage1']['name'];
    $pdf_type = $_FILES['subImage1']['type'];
    $pdf_size = $_FILES['subImage1']['size'];
    $pdf_tem_loc = $_FILES['subImage1']['tmp_name'];
    $pdf_store = "shopnow/src/photos/" . $subImage1;
    move_uploaded_file($pdf_tem_loc, $pdf_store);

    $subImage2 = $_FILES['subImage2']['name'];
    $pdf_type = $_FILES['subImage2']['type'];
    $pdf_size = $_FILES['subImage2']['size'];
    $pdf_tem_loc = $_FILES['subImage2']['tmp_name'];
    $pdf_store = "shopnow/src/photos/" . $subImage2;
    move_uploaded_file($pdf_tem_loc, $pdf_store);

    $sql = "INSERT INTO `admin_upload` (`id`, `name`, `dPrice`, `sPrice`, `disc`, `catagory`,`mainImage`,`subImage1`,`subImage2`) VALUES (NULL, '$name', '$dPrice', '$sPrice', '$disc', '$catagory','$mainImage','$subImage1','$subImage2')";

    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo "success";
    } else {
        echo "error";
    }
}
