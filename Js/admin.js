layDanhSachSanPham();
swapTab("sanpham");
AddClassActive("sp");
layDanhSachDonHang();
layDanhSachKhachHang();
priveteRoute();

layDanhSachTheLoai();
function logout() {
    localStorage.removeItem("Admin");
    location.href = "loginAdmin.html";
}
function layDanhSachTheLoai() {
    const data = {
        event: "lay_danh_sach_the_loai__khac__nhau",
    };
    Ajax("post", "php/theloai.php", data, function (res) {
        console.log(res);
        renderOptionTheLoai(res.items);
    });
}
function priveteRoute() {
    var admin = JSON.parse(localStorage.getItem("Admin"));
    if (!admin) {
        window.location.href = "loginAdmin.html";
    }
}
var listProduct = [];

function layDanhSachSanPham() {
    const data = {
        event: "lay_danh_sach_san_pham",
        page: 0,
        record: 10,
    };
    Ajax("post", "php/sanpham.php", data, function (res) {
        listProduct = res.items;
        renderTrSp(res.items);
        $(".sp ").append(`(${res.items.length})`);
    });
}

function layDanhSachDonHang() {
    const data = {
        event: "lay_danh_sach_don_hang",
    };
    Ajax("post", "php/order.php", data, function (res) {
        renderDsDonHang(res.items);
        $(".dh ").append(`(${res.items.length})`);
    });
}

function layDanhSachKhachHang() {
    const data = {
        event: "lay_danh_sach_khachhang",
    };
    Ajax("post", "php/khachhang.php", data, function (res) {
        renderDsKhachHang(res.items);
        $(".kh ").append(`(${res.items.length})`);
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

function renderDsKhachHang(listDonHang) {
    var tr = ``;
    for (let item of listDonHang) {
        tr =
            tr +
            `
        <tr>
            <td> ${item.HoKH} </td>
            <td> ${item.TenKH} </td>
            <td> ${item.Email} </td>
            <td> ${item.DiaChi} </td>
            <td> ${item.Avatar} </td>
            <td> ${item.Phone} </td>

            

        </tr>
        
        `;
    }
    $(".listDsKH").html(tr);
}
function renderDsDonHang(listDonHang) {
    var tr = ``;
    for (let item of listDonHang) {
        tr =
            tr +
            `
        <tr>
            <td><span class="badge badge-pill badge-light"> ${item.MaDH
            }</span> </td>
            <td><span class="badge badge-pill badge-light"> ${item.DiaChi
            }</span> </td>
            <td> <span class="badge badge-pill badge-success">${showTrangThai(
                item.TrangThai
            )}</span> </td>
            <td> <span class="badge badge-pill badge-danger">${formatPrice(
                item.Tong
            )}</span>  </td>
            <td> <span class="badge badge-pill badge-dark">${item.created_at
            }</span> </td>
            <td> <span class="badge badge-pill badge-dark">${item.updated_at
            }</span> </td>
            <td>
                <button class="btn btn-info"  onclick="detailOrder('${item.MaDH
            }')" >
                <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-danger"  onclick="deleteOrder('${item.MaDH
            }')" >
            <i class="fas fa-trash-alt"></i>
                    </button>
                    
               
          </td>


        </tr>
        
        `;
    }
    $(".listDsDH").html(tr);
}
function deleteOrder(madh) {
    var dataSend = {
        event: "xoa_don_hang",
        MaDH: madh
    }
    $.ajax({
        type: "post",
        url: "php/order.php",
        data: dataSend,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.ketqua == 1) {
                alert("xóa đơn hàng thành công");
                layDanhSachDonHang();
            }
        },
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
                 ${renderSanPhamDonHang(res.items)}
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

function renderOptionTheLoai(ls) {
    var option = ``;
    for (let item of ls) {
        option =
            option +
            `
         <option> ${item.TenTL} </option>
        
        `;
    }

    $(".option_theloai").html(option);
}

$(".logout").click(function (e) {
    logout();
});
function renderSanPhamDonHang(list) {
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

function detailOrder(madh) {
    $(".modal_chitietdonhang").modal("show");

    var madh = parseInt(madh);
    chiTietDonHang(madh);
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

function renderTrSp(listData) {
    var tr = "";
    for (let item of listData) {
        tr =
            tr +
            `
        <tr>
                <td>
                    <div class="product__image">
                        <img style="width:100px;height:100px" class="img-fluid" src="php/${item.AnhSanPham
            }"
                            alt="" />
                        <div>
                            <h6> ${item.TenSP} </h6>
                            <span class="bage development">development</span>
                        </div>
                    </div>
                </td>
                <td>

                <span class="badge rounded-pill bg-secondary" style="color:#fff">${item.MaTL
            }</span>
                </td>
                <td>

                <span class="badge rounded-pill bg-success" style="color:#fff">${formatPrice(
                item.Gia
            )}</span>
                </td>
                <td>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input"
                            id="customSwitch1" /><label class="custom-control-label"
                            for="customSwitch1"></label>
                    </div>
                </td>
            
                <td>
                    <button class="btn btn-info"  onclick="updateSp('${item.MaSP
            }','${item.TenSP}','${item.Gia}','${item.NoiDung}','${item.AnhSanPham
            }','${item.MaTL}')" >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteSp('${item.MaSP
            }')" >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
    </tr>
        `;
    }

    $(".listDsSP").html(tr);
}

$("#form_themsp").on("submit", function (e) {
    e.preventDefault();

    var fd = new FormData(this);
    fd.append("event", "them_san_pham");
    $.ajax({
        type: "post",
        url: "php/sanpham.php",
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (res) {
            if (res["ketqua"] == 1) {
                alert("Thêm thành công");
                resetInput();

                layDanhSachSanPham();
            }
        },
    });
});

function deleteSp(masp) {
    console.log(masp);
    const data = {
        event: "xoa_san_pham",
        MaSP: masp,
    };
    Ajax("post", "php/sanpham.php", data, function (res) {
        console.log(res);
        if (res["ketqua"] == 1) {
            alert("Xóa thành công");

            layDanhSachSanPham();
        }
    });
}

function resetInput() {
    $(".masp").val("");
    $(".tensp").val("");
    $(".gia").val("");
    $(".noidung").val("");
    $(".theloai").val("");
    $(".modal").modal("hide");
}

function updateSp(masp, tensp, gia, noidung, anhsp, matl) {
    $(".modal__capnhatsp").modal("show");
    $(".masp").val(masp);
    $(".tensp").val(tensp);
    $(".gia").val(gia);
    $(".noidung").val(noidung);
    $(".theloai").val(matl);
}

$("#form_updateSP").on("submit", function (e) {
    e.preventDefault();
    var fdata = new FormData(this);
    fdata.append("event", "cap_nhat_san_pham");

    $.ajax({
        type: "post",
        url: "php/sanpham.php",
        data: fdata,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res["cap_nhat_san_pham"] == 1) {
                $(".modal__capnhatsp").modal("hide");
                alert("Cập nhật thành công");
                resetInput();
                layDanhSachSanPham();
            }
        },
    });
});

function swapTab(tab) {
    $(".sanpham").addClass("is__hidden");
    $(".theloai").addClass("is__hidden");
    $(".khachhang").addClass("is__hidden");

    $(".donhang").addClass("is__hidden");
    $(".lienhe").addClass("is__hidden");

    $(`.${tab}`).removeClass("is__hidden");
    // $(".nav-item__sp").addClass("active");
}

function AddClassActive(active) {
    $(".sp").removeClass("active");
    $(".tl").removeClass("active");
    $(".kh").removeClass("active");
    $(".dh").removeClass("active");
    $(".lh").removeClass("active");

    $(`.${active}`).addClass("active");
}

$(".sp").click(function () {
    swapTab("sanpham");
    AddClassActive("sp");
});

$(".tl").click(function () {
    swapTab("theloai");
    AddClassActive("tl");
});

$(".kh").click(function () {
    swapTab("khachhang");
    AddClassActive("kh");
});

$(".dh").click(function () {
    swapTab("donhang");
    AddClassActive("dh");
});

$(".lh").click(function () {
    swapTab("lienhe");
    AddClassActive("lh");
});

// fortmat price
function formatPrice(price) {
    const formatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });

    return formatter.format(price);
}
