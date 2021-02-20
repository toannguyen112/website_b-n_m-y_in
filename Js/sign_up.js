$("#form__signUp").on("submit", function (e) {
    e.preventDefault();

    var fd = new FormData(this);
    fd.append("event", "signUp");
    $.ajax({
        type: "post",
        url: "php/sign_up.php",
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res["ketqua"] == 1) {
                swal("Đăng ký thành công", "You clicked the button!", "success").then(
                    (res) => {
                        location.href = "sign-in.html";
                    }
                );
            } else {
                swal("Đăng ký thất bại", "You clicked the button!", "error");
            }
        },
    });
});
