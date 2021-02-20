// btn order
$(".button_payment").on("click", function (e) {
    e.preventDefault();
    var user = JSON.parse(localStorage.getItem("User"));
    var listCart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];
    var DiaChi = $(".diachinhanhang").val();
    var total = totalPrice();
    if (user === undefined || user === null) {
        alert("Yêu cầu đăng nhập");
        location.href = "sign-in.html";
    } else if (listCart.length <= 0) {
        alert("chưa có sản phẩm trong giỏ hàng");
    } else {
        var order = {
            event: "order",
            MaSP: JSON.stringify(listCart),
            MaKH: user.MaKH,
            DiaChi: DiaChi,
            Tong: total,
        };

        $.ajax({
            type: "post",
            url: "php/order.php",
            data: order,
            dataType: "json",
            success: function (response) {
                if (response.ketqua === 1) {
                    sendEmail();
                }
            },
        });
    }
});

function totalPrice() {
    var listCart = localStorage.getItem("listCart")
        ? JSON.parse(localStorage.getItem("listCart"))
        : [];

    return listCart.reduce((tsl, product, index) => {
        return (tsl += product.SoLuong * product.Gia);
    }, 0);
}

function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "nguyencongtoana112nhvt@gmail.com",
        Password: "fakervn11",
        To: "nguyencongtoana112nhvt@gmail.com",
        From: "nguyencongtoana1nhvt@gmail.com",
        Subject: "Đơn hàng #1",
        Body: "Bạn đã đặt hàng thành công!!",
        Attachments: [
            {
                name: "File_Name_with_Extension",
                path: "Full Path of the file",
            },
        ],
    }).then(function (message) {
        swal("Đặt hàng thành công", "You clicked the button!", "success").then(
            (res) => {
                window.location.href = "profile.html";
            }
        );
    });
}
