$('#form_signIn').on('submit', function (e) {
    e.preventDefault();

    var fd = new FormData(this);
    fd.append("event", "signIn")
    $.ajax({
        type: "post",
        url: "php/sign_in.php",
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.event == 1) {
                var resultUser = {
                    email: res.user.Email,
                    password: res.user.Password,
                    MaKH: res.user.MaKH,

                };
                localStorage.setItem("User", JSON.stringify(resultUser));
                swal("Đăng nhập thành công", "You clicked the button!", "success").then((res) => {

                    window.location.href = "index.html";
                });
            } else {
                alert("Tài khoản hoặc mật khẩu không đúng");
            }
        }
    });
});

