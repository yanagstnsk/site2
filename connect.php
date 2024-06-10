<?php
$first_name=$_POST['first_name'];
$last_name=$_POST['last_name'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$product_sku=$_POST['product_sku'];
$size=$_POST['size'];
$conn = new mysqli('localhost:4306','root','','test');
if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
}
else{
    $stmt = $conn->prepare("insert into registration(first_name, last_name, phone, email, product_sku, size)
    values(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $first_name, $last_name, $phone, $email, $product_sku, $size);
    $stmt->execute();
    echo "registration succesful...";
    $stmt->close();
    $conn->close();
}

?>