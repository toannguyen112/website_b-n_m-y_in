layDanhSachSanPham();
layDanhSachDonHang();
priveteRoute();
var listProduct = [];

function priveteRoute() {
    var user = JSON.parse(localStorage.getItem("User"));
    if (!user) {
        window.location.href = "index.html";
    }

    $('.costomer').html(user.email);
}
function renderDsDonHang(listDonHang) {
    var html = ``;
    if (listDonHang.length > 0) {
        for (let item of listDonHang) {
            html =
                html +
                `
                         <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <span class="badge badge-info badge-pill">Mã đơn hàng :${item.MaDH
                }</span>
                                        <span class="badge badge-danger badge-pill">Trạng thái : ${showTrangThai(
                    item.TrangThai
                )}</span>
                                        <span class="badge badge-primary badge-pill">Tổng : ${formatPrice(
                    item.Tong
                )}</span>
                                        <span style="cursor:pointer" onclick="detailOrder('${item.MaDH
                }')" ><i class="fas fa-eye"></i></span>
    
                                    </li>
    
            `;
        }
        $(".list-group").html(html);
    } else {
        html = `
        
        <div>
        Bạn chưa có đơn hàng nào !!
        </div>
        `;
        $(".list-group").html(html);
    }
}

function detailOrder(madh) {
    $(".modal_chitietdonhang").modal("show");

    var madh = parseInt(madh);
    chiTietDonHang(madh);
}

function layDanhSachDonHang() {
    var MaKH = localStorage.getItem("User")
        ? JSON.parse(localStorage.getItem("User")).MaKH
        : null;
    const data = {
        event: "lay_danh_sach_don_hang_cua_khachhang",
        MaKH: MaKH,
    };
    Ajax("post", "php/order.php", data, function (res) {
        renderDsDonHang(res.items);
    });
}

function chiTietDonHang(madh) {
    const data = {
        event: "lay_chi_tiet_don_hang",
        MaDH: madh,
    };
    Ajax("post", "php/order.php", data, function (res) {
        $(".modal-content").html(
            `
            <div class="modal-header">
            <h5 class="modal-title">   </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <table class="table">
            <thead>
                <tr>
                    <th>Mã Sản Phẩm</th>
                    <th>Hình Ảnh</th>

                    <th>Số Lượng</th>
                </tr>
            </thead>
            <tbody>
                 ${renderSanPham(res.items)}
            </tbody>
        </table>
              
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>`
        );

        $(".modal-title").html(` Mã Đơn Hàng : #${madh}`);
    });
}

function Ajax(type, url, data, callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: "json",
        success: callback,
    });
}

function renderSanPham(list) {
    var html = ``;
    for (const [i, item] of list.entries()) {
        html =
            html +
            `
            <tr>
                <td>
                   
                    <span class="badge badge-info badge-pill"> #${item.MaSP}</span>
                </td>
                <td>

                 <img style="width:40px" src="php/${listProduct[i].AnhSanPham}" />
                 </td>
                <td>
                   <span class="badge badge-danger badge-pill"> ${item.SoLuong}</span>
                </td>

            </tr>
        
        `;
    }

    return html;
}

function showTrangThai(trangThai) {
    if (trangThai == 0) {
        return "Đặt hàng";
    } else if (trangThai == 1) {
        return "Đang giao dịch";
    } else if (trangThai == 2) {
        return "Hoàn thành";
    } else if (trangThai == 3) {
        return "Kết thúc";
    } else {
        return "Đã hủy";
    }
}

function layDanhSachSanPham() {
    var data = {
        event: "lay_danh_sach_san_pham",
        page: 0,
        record: 10,
    };
    $.ajax({
        type: "POST",
        url: "php/sanpham.php",
        data: data,
        dataType: "json",
        success: function (res) {
            listProduct = res.items;
        },
    });
}

// fortmat price
function formatPrice(price) {
    const formatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });

    return formatter.format(price);
}
