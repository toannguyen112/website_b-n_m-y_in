<?php
$hostname = 'localhost';
$username = 'toan';
$password = 'toannguyen112';
$dbname = "qlbanmayin";
$conn = mysqli_connect($hostname, $username, $password, $dbname, 3306);

if (!$conn) {
    die('Không thể kết nối: ' . mysqli_error($conn));
    exit();
}
// echo "ket noi thanh cong";
mysqli_set_charset($conn, "utf8_general_ci");
