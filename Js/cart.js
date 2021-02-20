renderListCart(totalPrice);
showUserLogin();

$(".logout").click(function () {
    logout();
});
function renderListCart() {
    var listCart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];
    totalPrice(listCart)
    var temp = ``;

    if (listCart.length > 0) {
        for (let item of listCart) {
            temp =
                temp +
                `
            <li class="list__cart__item">
            <div class="row">
                <div class="col-md-2">
                    <div class="product_image">
                        <img src="php/${item.AnhSanPham}"
                            alt="" class="img-fluid" />
                    </div>
                    <div class="qty" >
                       Số Lượng : ${item.SoLuong}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product__des">
                        <p class="product__des--name">
                        ${item.TenSP}
                        </p>
                        <p class="product__des--status">
                            <i class="fas fa-check"></i> Còn hàng
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="product__price">
                        <div class="product__price--new"> ${formatPrice(
                    item.Gia
                )}  </div>
                        <div class="product__price--old">2.690.000 </div>
                        <div class="product__price--total">
                            Tổng : ${formatPrice(item.Gia)} 
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="deleteItem">
                        <i class="fas fa-trash-alt" onclick="deleteCartItem('${item.MaSP
                }')" ></i>
                    </div>
                </div>
            </div>
        </li>
            `;
        }

        $(".list__cart").html(temp);

    } else {
        var html = `
            <div>
                Không Có Sản Phẩm Trong Giỏ Hàng !!
            </div>
        `;
        $(".list__cart").html(html);
    }

}

function deleteCartItem(masp) {
    var listCart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];
    var newListCart = listCart.filter((item) => item.MaSP !== masp);
    localStorage.setItem("listCart", JSON.stringify(newListCart));
    showCart();
    renderListCart();
    var price = newListCart.reduce((tsl, product, index) => {
        return (tsl += product.SoLuong * product.Gia);
    }, 0);
    $(".price__total").html(formatPrice(price));
}

function totalPrice(newListCart) {

    var price = newListCart.reduce((tsl, product, index) => {
        return (tsl += product.SoLuong * product.Gia);
    }, 0);
    $(".price__total").html(formatPrice(price));
}
