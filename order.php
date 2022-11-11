<?php
include("./connection.php");

$name = $_POST['name'];
$email = $_POST['email'];
$street = $_POST['street'];
$apartment = $_POST['apartment'];
$town = $_POST['town'];
$dis = $_POST['dis'];
$pin = $_POST['pin'];
$phone = $_POST['phone'];
$msg = $_POST['msg'];
$orderDetails = $_POST['orderDetails'];
$total = $_POST['total'];

// $ss = base64_encode(serialize($apartment));


if ($email) {

    $email_to = "$email";
    $subject = "Order placed";
    $body = "Hi,$name ,Your order has been placed we will reach you soon";
    $headers = "From : webtechd7@gmail.com";



    if (mail($email_to, $subject, $body, $headers)) {

        $sql = "INSERT INTO `order_details` (`id`, `name`, `email`, `street`, `apartment`, `town`, `dis`, `pin`, `phone`, `msg`, `orderDetails`, `total`, `date`) VALUES (NULL, '$name', '$email', '$street', '$apartment', '$town', '$dis', '$pin', '$phone', '$msg', '$orderDetails', '$total', current_timestamp())";

        $result = mysqli_query($conn, $sql);
        if ($result) {
            echo "Success";
        } else {
            echo "Error";
        }
    } else {
        echo "Email failed";
    }
} else {
    // echo json_encode(['type' => 'Email already exist']);
    echo "email does not exist";
}
