<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "them_san_pham":
        $MaSP = $_POST['MaSP'];
        $TenSP = $_POST['TenSP'];
        $Gia = $_POST['Gia'];
        $NoiDung = $_POST['NoiDung'];
        $AnhSanPham = $_FILES['file']['name'];
        $MaTL = $_POST['MaTL'];





        $sql = "INSERT INTO `sanpham` (MaSP,TenSP,Gia,NoiDung,AnhSanPham,MaTL) VALUES('" . $MaSP . "','" . $TenSP . "','" . $Gia . "','" . $NoiDung . "','" . $AnhSanPham . "','" . $MaTL . "')";
        if (mysqli_query($conn, $sql)) {
            move_uploaded_file($_FILES['file']['tmp_name'], __DIR__ . '../' . $_FILES["file"]['name']);
            $res['ketqua'] = 1;
        } else {
            $res['ketqua'] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "xoa_san_pham":

        $MaSP = $_POST['MaSP'];
        $sql = "DELETE FROM `sanpham` WHERE MaSP='" . $MaSP . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res['ketqua'] = 1;
        } else {
            $res['ketqua'] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;


    case "cap_nhat_san_pham":
        $MaSP = $_POST['MaSP'];
        $TenSP = $_POST['TenSP'];
        $Gia = $_POST['Gia'];
        $NoiDung = $_POST['NoiDung'];
        $AnhSanPham = $_FILES['file']['name'];
        $MaTL = $_POST['MaTL'];
        if (empty($AnhSanPham)) {
            $sql = "UPDATE  `sanpham` SET TenSP='" . $TenSP . "',Gia='" . $Gia . "' ,NoiDung='" . $NoiDung . "',MaTL='" . $MaTL . "' WHERE MaSP='" . $MaSP . "'";
        } else {

            $sql = "UPDATE  `sanpham` SET TenSP='" . $TenSP . "',Gia='" . $Gia . "' ,NoiDung='" . $NoiDung . "',AnhSanPham='" . $AnhSanPham . "',MaTL='" . $MaTL . "' WHERE MaSP='" . $MaSP . "'";
        }
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "lay_danh_sach_san_pham":

        $mang = array();
        $record = $_POST['record'];
        $page = $_POST['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "SELECT * FROM  sanpham "  . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaSP'] = $rows['MaSP'];
            $usertemp['TenSP'] = $rows['TenSP'];
            $usertemp['NoiDung'] = $rows['NoiDung'];

            $usertemp['Gia'] = $rows['Gia'];
            $usertemp['AnhSanPham'] = $rows['AnhSanPham'];
            $usertemp['MaTL'] = $rows['MaTL'];






            $mang[] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sanpham");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;


    case "lay_chi_tiet_san_pham":
        $mang = array();
        $id  = $_POST['id'];
        $sql = mysqli_query($conn, "SELECT * From sanpham WHERE MaSP='" . $id . "' ");

        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaSP'] = $rows['MaSP'];
            $usertemp['TenSP'] = $rows['TenSP'];
            $usertemp['NoiDung'] = $rows['NoiDung'];

            $usertemp['Gia'] = $rows['Gia'];
            $usertemp['AnhSanPham'] = $rows['AnhSanPham'];
            $usertemp['MaTL'] = $rows['MaTL'];
        }

        $jsonData['item'] = $usertemp;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;


    default:
        # code...
        break;
}
