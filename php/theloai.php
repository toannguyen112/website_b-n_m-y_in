<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "them_the_loai":
        $MaTL = $_POST['MaTL'];
        $TenTL = $_POST['TenTL'];
        $AnhTL = $_FILES['file']['name'];




        $sql = "INSERT INTO `theloai` (MaTL,TenTL,AnhTL) VALUES('" . $MaTL . "','" . $TenTL . "','" . $AnhTL . "')";
        if (mysqli_query($conn, $sql)) {
            move_uploaded_file($_FILES['file']['tmp_name'], __DIR__ . '../' . $_FILES["file"]['name']);
            $res['ketqua'] = 1;
        } else {
            $res['ketqua'] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "xoa_the_loai":

        $MaTL = $_POST['MaTL'];
        $sql = "DELETE FROM `theloai` WHERE MaTL='" . $MaTL . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res['ketqua'] = 1;
        } else {
            $res['ketqua'] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;


    case "cap_nhat_the_loai":
        $MaTL = $_POST['MaTL'];
        $TenTL = $_POST['TenTL'];
        $AnhTL = $_FILES['file']['name'];
        $sql = "UPDATE  `theloai` SET TenTL='" . $TenTL . "',AnhTL='" . $AnhTL . "' WHERE MaTL='" . $MaTL . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "lay_danh_sach_the_loai":

        $mang = array();
        $sql = mysqli_query($conn, "SELECT * FROM  `theloai` ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaTL'] = $rows['MaTL'];
            $usertemp['TenTL'] = $rows['TenTL'];
            $usertemp['AnhTL'] = $rows['AnhTL'];




            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;



    case "lay_danh_sach_the_loai__khac__nhau":

        $mang = array();
        $sql = mysqli_query($conn, "SELECT distinct TenTL FROM  `theloai` ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['TenTL'] = $rows['TenTL'];





            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;


    case "lay_chi_tiet_the_loai":
        $mang = array();
        $id  = $_POST['id'];
        $sql = mysqli_query($conn, "SELECT * From theloai WHERE MaTL='" . $id . "' ");

        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaTL'] = $rows['MaTL'];
            $usertemp['TenTL'] = $rows['TenTL'];
            $usertemp['AnhTL'] = $rows['AnhTL'];
        }

        $jsonData['item'] = $usertemp;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;


    default:
        # code...
        break;
}
