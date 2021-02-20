
layDanhSachTheLoai();

$("#form_tl").on("submit", function (e) {

    e.preventDefault();
    var textTitle = $('.modal_theloai .modal-title').text();
    var fd = new FormData(this);
    if (textTitle === "Thêm Thể Loại") {
        fd.append("event", "them_the_loai");
        $.ajax({
            type: "post",
            url: "php/theloai.php",
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res["ketqua"] == 1) {
                    alert("Thêm thể loại thành công");
                    resetInputTheLoai();
                    layDanhSachTheLoai();

                }
            },
        });
    } else if (textTitle === "Cập nhật thể loại") {
        fd.append("event", "cap_nhat_the_loai");
        $.ajax({
            type: "post",
            url: "php/theloai.php",
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res["cap_nhat_the_loai"] == 1) {
                    alert("Cập nhật  thể loại thành công");
                    resetInputTheLoai();
                    layDanhSachTheLoai();

                }
            },
        });
    }



});

function resetInputTheLoai() {
    $('.matl').val('');
    $('.tentl').val('');
    $('#file').val('');
    $('.modal_theloai').modal("hide");

}

function layDanhSachTheLoai() {
    const data = {
        event: "lay_danh_sach_the_loai",
    };
    Ajax("post", "php/theloai.php", data, function (res) {
        renderTrTheLoai(res.items);
        $('.tl ').append(`(${res.items.length})`);
    });
}

function renderTrTheLoai(listData) {
    var tr = "";
    for (let item of listData) {
        tr =
            tr +
            `
        <tr>
                <td>
                    <div class="product__image">
                        <img style="width:100px;height:100px" class="img-fluid" src="php/${item.AnhTL}"
                            alt="" />
                        <div>
                            <h6> ${item.TenTL} </h6>
                            <span class="bage development">development</span>
                        </div>
                    </div>
                </td>
                <td>

                <h6>Toàn Nguyễn</h6>
                <span class="bage admin">Admin</span>
                </td>
                <td>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input"
                            id="customSwitch1" /><label class="custom-control-label"
                            for="customSwitch1"></label>
                    </div>
                </td>
            
                <td>
                    <button class="btn btn-info"  onclick="updateTheLoai('${item.MaTL}','${item.TenTL}')"  >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteTheLoai('${item.MaTL}')" >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
    </tr>
        `;
    }

    $(".listDsTL").html(tr);
}

function updateTheLoai(matl, tentl) {
    $('.modal_theloai').modal('show');
    $('.modal_theloai .modal-title').html("Cập nhật thể loại");
    $('.modal_theloai .btn-handle').html("Cập nhật");
    $('.modal_theloai .matl').val(matl);
    $('.modal_theloai .tentl').val(tentl);


}

function deleteTheLoai(matl) {
    console.log(matl);
    const data = {
        event: "xoa_the_loai",
        MaTL: matl
    }
    Ajax('post', 'php/theloai.php', data, function (res) {
        console.log(res);
        if (res['ketqua'] == 1) {
            alert("xoá thành công");
            layDanhSachTheLoai();
        }
    })
}




$('.closeModal').click(function (e) {
    console.log("close");
    $('.modal_theloai .modal-title').html("Thêm thể loại");

});