showUserLogin();
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
layChiTietSanPham(id);
var masp;
var tensp;
var gia;
var anhsp;
function layChiTietSanPham(id) {
    const data = {
        event: 'lay_chi_tiet_san_pham',
        id: id
    }
    $.ajax({
        type: "post",
        url: "php/sanpham.php",
        data: data,
        dataType: "json",
        success: function (res) {
            renderPageDetail(res.item);
        }
    });
}

$(".logout").click(function () {
    logout();
});

function renderPageDetail(res) {
    $('.product__name').html(res.TenSP);
    $('.detail_product_price--new').html(`${formatPrice(res.Gia)}`);
    $('.product_image__content').attr('src', `php/${res.AnhSanPham}`);
    masp = res.MaSP;
    tensp = res.TenSP;
    gia = res.Gia;
    anhsp = res.AnhSanPham;
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



$('.button__buy').on('click', function () {
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
    location.href = 'cart_page.html'
});
