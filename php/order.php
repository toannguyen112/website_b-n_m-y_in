<?php
require_once("server.php");
$event = $_POST['event'];
switch ($event) {
    case "order":

        $MaKH = $_POST['MaKH'];
        $DiaChi = $_POST['DiaChi'];
        $MaSP = $_POST['MaSP'];
        $Tong = $_POST['Tong'];
        $TrangThai = 0;
        // chuyển string json thành json array object 
        $arrSP = json_decode($MaSP, true);
        $sql = "INSERT INTO `donhang` (MaKH,DiaChi,TrangThai,Tong) VALUES('" . $MaKH . "','" . $DiaChi . "','" . $TrangThai . "','" . $Tong . "');";
        mysqli_query($conn, $sql);
        // lấy mã đơn hàng sau khi thêm vào table donhang
        $MaDH = mysqli_insert_id($conn);


        // loop để thêm các sản phẩm vào table chitietsanpham  ứng theo mẫ đơn hàng
        for ($i = 0; $i < count($arrSP); $i++) {
            $MaSP = $arrSP[$i]['MaSP'];
            $SoLuong = $arrSP[$i]['SoLuong'];

            $sql = "INSERT INTO `chitietdonhang` (MaDH,MaSP,SoLuong) VALUES('" . $MaDH . "  ',' " . $MaSP . "  ', ' " . $SoLuong . " ' )";

            mysqli_query($conn, $sql);
        }
        $jsonData['ketqua'] = 1;
        echo json_encode($jsonData);

        mysqli_close($conn);
        break;
    case "lay_danh_sach_don_hang":

        $mang = array();
        $sql = mysqli_query($conn, "SELECT * FROM  `donhang` ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaDH'] = $rows['MaDH'];
            $usertemp['TrangThai'] = $rows['TrangThai'];
            $usertemp['DiaChi'] = $rows['DiaChi'];
            $usertemp['MaKH'] = $rows['MaKH'];
            $usertemp['Tong'] = $rows['Tong'];
            $usertemp['created_at'] = $rows['created_at'];
            $usertemp['updated_at'] = $rows['updated_at'];








            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;



    case "lay_danh_sach_don_hang_cua_khachhang":
        $MaKH = $_POST['MaKH'];
        $mang = array();
        $sql = mysqli_query($conn, "SELECT * FROM  `donhang` where MaKH =   " . $MaKH . "  ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaDH'] = $rows['MaDH'];
            $usertemp['TrangThai'] = $rows['TrangThai'];
            $usertemp['DiaChi'] = $rows['DiaChi'];
            $usertemp['Tong'] = $rows['Tong'];
            $usertemp['created_at'] = $rows['created_at'];
            $usertemp['updated_at'] = $rows['updated_at'];









            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case 'lay_chi_tiet_don_hang':

        $MaDH = $_POST['MaDH'];
        $mang = array();
        $sql = mysqli_query($conn, "SELECT * FROM  `chitietdonhang` where MaDH =   " . $MaDH . "  ");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['MaSP'] = $rows['MaSP'];
            $usertemp['SoLuong'] = $rows['SoLuong'];











            $mang[] = $usertemp;
        }

        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case 'xoa_don_hang':

        $MaDH = $_POST['MaDH'];
        $sql = "DELETE FROM `donhang` WHERE MaDH='" . $MaDH . "';";
        $sql .= "DELETE FROM `chitietdonhang` WHERE MaDH='" . $MaDH . "' ";
        mysqli_multi_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
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
