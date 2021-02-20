<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "login":
        $u = $_POST['email'];
        $p = md5($_POST['password']);
        $check = '';
        $sql = mysqli_query($conn, "select email,password from admin where email='" . $u . "' and password='" . $p . "'");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['email'] = $rows['email'];
            $usertemp['password'] = $rows['password'];
            $check = $rows['email'];
        }
        if ($check != '') {
            $jsonData['event'] = 1;

            $jsonData['admin'] = $usertemp;

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
