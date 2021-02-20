var danhSachSanPham = [];
var danhSachTheLoai = [];
var recordSP = 8;

layDanhSachSanPham(0, recordSP);
layDanhSachTheLoai();
showUserLogin();
showCart();

function layDanhSachTheLoai() {
    var data = {
        event: "lay_danh_sach_the_loai",
    };
    $.ajax({
        type: "POST",
        url: "php/theloai.php",
        data: data,
        dataType: "json",
        success: function (res) {
            renderListCaterory(res.items);
        },
    });
}

function layDanhSachSanPham(page, record) {
    var data = {
        event: "lay_danh_sach_san_pham",
        page: page,
        record: record,
    };
    console.log(data);
    $.ajax({
        type: "POST",
        url: "php/sanpham.php",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            danhSachSanPham = res.items;
            renderCard(res.items, res.page, res.total);
        },
    });
}

// fn logout
function logout() {
    swal("Đăng Xuất thành công", "You clicked the button!", "success").then(
        () => {
            window.location.reload();
        }
    );
    localStorage.removeItem("User");
    showUserLogin();
}

function showUserLogin() {
    var user = localStorage.getItem("User")
        ? JSON.parse(localStorage.getItem("User"))
        : "";
    var email = user.email;
    if (email == "" || email == undefined || email == null) {
        var html = `
        <div class="btn-signIn-signUp">
              <a href="sign-up.html"> Đăng ký</a> | <a href="sign-in.html">Đăng nhập</a>
         </div>
        `;
        $(".user__container").html(html);
    } else {
        var html = ` <div class="user" style="color:#fff" >
        <div class="dropdown open">
            <button class="  dropdown-toggle"  id="triggerId"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="name_user"> <img style="width:25px;height:25px;border-radius:50%" src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg" />  </span>
            </button>
            
            <div class="dropdown-menu" aria-labelledby="triggerId">
            
                <button class="dropdown-item profile_btn"  onclick="profile()" ><i class="fas fa-user"></i> Hồ sơ</button>
                <button class="dropdown-item logout"><i class="fas fa-sign-out-alt"></i> Đăng xuất</button>

            </div>
        </div>
    </div>`;
        $(".user__container").html(html);
    }
}

function profile() {
    location.href = "profile.html";
}

function renderCard(listData, page, total) {
    var html = "";
    var stt = 1;
    var currentpage = parseInt(page);
    stt = printSTT(recordSP, currentpage);
    for (let item of listData) {
        html =
            html +
            `
        <div class="col-md-3">
        <div class="poduct__card"  >
            <div class="discount">
                -15%
            </div>
            <div class="poduct__card--image" onclick="detailProduct('${item.MaSP
            }')" >
                <img class="img-fluid"
                    src="php/${item.AnhSanPham}"
                    alt="">
            </div>
            <div class="poduct__card--des">
                ${item.TenSP.substr(0, 30) + "..."}
            </div>
            <div class="poduct__card--price">
                <div class="poduct__card--price__old">
                    Gía niêm yết:<span style="font-weight: bold;">5.850.000 ₫</span>
                </div>
                <div class="poduct__card--price__new" style="color:#de0b00 ; font-weight: bold;">
                    Gía bán: ${item.Gia}  ₫
                </div>
            </div>
            <div class="add_cart">

                <button style="outline:none" onclick="onToCart('${item.MaSP
            }','${item.TenSP}','${item.Gia}','${item.NoiDung}','${item.AnhSanPham
            }','${item.MaTL}')">
                    <i class="fas fa-cart-plus"></i>
                    <span class="cart__text">Giỏ Hàng</span>

                </button>
            </div>
        </div>
    </div>
        
        `;
    }
    $(".listProduct").html(html);
    buildSlidePage($(".pagenumbertheloai"), 1, page, total);
}

function printSTT(record, pageCurr) {
    if (pageCurr + 1 == 1) {
        return 1;
    } else {
        return record * (pageCurr + 1) - (record - 1);
    }
}

var sp_current = 0;
$(".pagenumbertheloai").on("click", "button", function () {
    sp_current = $(this).val();
    console.log(sp_current);
    layDanhSachSanPham($(this).val(), recordSP);
});

function buildSlidePage(obj, codan, pageActive, totalPage) {
    var html = "";
    pageActive = parseInt(pageActive);
    for (i = 1; i <= codan; i++) {
        if (pageActive - i < 0) break;
        html =
            '<button type="button" class="btn btn-outline btn-default btn-border " value="' +
            (pageActive - i) +
            '">' +
            (pageActive - i + 1) +
            "</button>" +
            html;
    }
    if (pageActive > codan) {
        html =
            '<button type="button" class="btn btn-outline btn-default btn-border " value="' +
            (pageActive - i) +
            '"><i class="fas fa-chevron-left"></i></button>' +
            html;
    }
    html +=
        '<button type="button" class="btn btn-outline btn-default  " style="background-color: #5cb85c;border:1px solid #5cb85c;border-radius:50%" value="' +
        pageActive +
        '">' +
        (pageActive + 1) +
        "</button>";
    for (i = 1; i <= codan; i++) {
        if (pageActive + i >= totalPage) break;
        html =
            html +
            '<button  type="button"  class="btn btn-outline btn-default btn-border " value="' +
            (pageActive + i) +
            '">' +
            (pageActive + i + 1) +
            "</button>";
    }
    if (totalPage - pageActive > codan + 1) {
        html =
            html +
            '<button type="button" value="' +
            (pageActive + i) +
            '" class="btn btn-outline btn-default btn-border "><i class="fas fa-chevron-right"></i></button>';
    }
    obj.html(html);
}

function renderListCaterory(list) {
    var html = "";
    for (let item of list) {
        html =
            html +
            `
                 <li class="list__category__item">
                        <img src="php/${item.AnhTL}" alt=""
                            class="list__category__item__image">
                    </li>
                         `;
    }

    $(".list__category").html(html);
}

// thêm giỏ hàng
function onToCart(masp, tensp, gia, noidung, anhsp, matl) {
    var cart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];
    var product = {
        MaSP: masp,
        Gia: gia,
        TenSP: tensp,
        AnhSanPham: anhsp,
        SoLuong: 1,
    };

    if (cart) {
        var index = cart.findIndex((product) => product.MaSP === masp);
        if (index === -1) {
            cart = [...cart, product];
        } else {
            cart[index].SoLuong++;
        }

        localStorage.setItem("listCart", JSON.stringify(cart));
    }
    showCart();
    alert("Thêm giỏ hàng thành công");
}

function detailProduct(masp) {
    window.location.href = `detail.html?id=${masp}`;
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

function showCart() {
    var lenghtCart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];
    var cartHtml = `
    <i class="fas fa-shopping-cart mr-2"></i>
    Giỏ hàng : <span class="cart__number"> ${lenghtCart.length} </span> 
     `;

    $(".cart").html(cartHtml);
}

// tìm kiếm
$(".input__search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    var res = null;
    if (value.length > 0 && value.length !== "") {
        $(".search__result").addClass("d-block");
        console.log(danhSachSanPham);
        var newListDsSP = danhSachSanPham.filter(
            (item) =>
                item.TenSP.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1 ||
                item.MaSP.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1 ||
                item.MaTL.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
        );

        res = newListDsSP.map((item) => {
            return (res = `
            
            <div class="search__result__item" onclick="detailProduct('${item.MaSP
                }')" >
            <div class="row">
                <div class="col-md-3">
                    <div class="search__result__item__left">
                        <img class="img-fluid"
                            src="php/${item.AnhSanPham}"
                            alt="">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="search__result__item__right">
                        <div class="search__result__item__right__des">
                        ${item.TenSP}
                        </div>
                        <div class="search__result__item__right__price">
                            Giá: ${formatPrice(item.Gia)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            
            `);
        });
        $(".search__result").html(res);
    } else {
        $(".search__result").removeClass("d-block");
    }
});
// đăng xuất
$(".logout").click(function () {
    logout();
});
