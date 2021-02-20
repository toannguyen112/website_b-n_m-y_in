<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {


    case "lay_danh_sach_khachhang":

        $mang = array();
        $sql = mysqli_query($conn, "SELECT * FROM  `khachhang` ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['HoKH'] = $rows['HoKH'];
            $usertemp['DiaChi'] = $rows['DiaChi'];
            $usertemp['TenKH'] = $rows['TenKH'];
            $usertemp['Email'] = $rows['Email'];
            $usertemp['Avatar'] = $rows['Avatar'];
            $usertemp['Phone'] = $rows['Phone'];








            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;











    default:
        # code...
        break;
}
