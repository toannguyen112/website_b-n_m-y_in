<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "signIn":
        $u = $_POST['email'];
        $p = md5($_POST['password']);
        $check = '';
        $sql = mysqli_query($conn, "SELECT * FROM khachhang WHERE Email='" . $u . "' and Password='" . $p . "'");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaKH'] = $rows['MaKH'];
            $usertemp['Email'] = $rows['Email'];
            $usertemp['Password'] = $rows['Password'];

            $check = $rows['Email'];
        }
        if ($check != '') {
            $jsonData['event'] = 1;

            $jsonData['user'] = $usertemp;

            echo json_encode($jsonData);
        } else {
            $jsonData['event'] = 0;

            echo json_encode($jsonData);
        }
        mysqli_close($conn);
        break;
    default:
        # code...
        break;
}
