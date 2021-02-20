<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "signUp":
        $u = $_POST['email'];
        $p = md5($_POST['password']);

        $sql = "INSERT INTO `khachhang` (Email,Password) VALUES('" . $u . "','" . $p . "') ";

        if (mysqli_query($conn, $sql)) {
            $res['ketqua'] = 1;
        } else {
            $res['ketqua'] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    default:
        # code...
        break;
}
