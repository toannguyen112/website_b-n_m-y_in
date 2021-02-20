$('#form_signIn').on('submit', function (e) {
    e.preventDefault();
    console.log("login");

    var fd = new FormData(this);
    fd.append("event", "login")
    $.ajax({
        type: "post",
        url: "php/loginadmin.php",
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.event == 1) {
                var resultUser = {
                    email: res.admin.Email,
                    password: res.admin.Password,
                    MaKH: res.admin.MaKH,

                };
                localStorage.setItem("Admin", JSON.stringify(resultUser));
                swal("Đăng nhập thành công", "You clicked the button!", "success").then((res) => {

                    window.location.href = "admin.html";
                });
            } else {
                alert("Tài khoản hoặc mật khẩu không đúng");
            }
        }
    });
});

