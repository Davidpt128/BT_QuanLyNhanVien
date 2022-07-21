var mangNhanVien = [];
var kiemTra = new Validation();
document.querySelector('#btnXacNhan').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoLuong = document.querySelector('#chucVu').value;
    var e = document.querySelector('#chucVu');
    nv.chucVu = e.options[e.selectedIndex].text;    ;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;
    nv.tongLuong = nv.luongCoBan * nv.heSoLuong;
    if(nv.gioLamTrongThang < 100){
        nv.xepLoaiNhanVien = 'Nhân viên giỏi'
    }
    else {
        nv.xepLoaiNhanVien = 'Nhân viên xuất sắc'

    }
    console.log('nv', nv);

    var valid = true;
    //Kiểm tra rỗng
    valid = valid & kiemTra.kiemTraRong(nv.maNhanVien,'#error_required_maNhanVien') & kiemTra.kiemTraRong(nv.tenNhanVien,'#error_required_tenNhanVien');
    //Kiểm tra ký tự
    valid &= kiemTra.kiemTraKyTu(nv.tenNhanVien,'#error_all_letter_tenNhanVien');
    //Kiểm tra tất cả là số
    valid &= kiemTra.kiemTraTatCaSo(nv.luongCoBan,'#error_all_number_luongCoBan') & kiemTra.kiemTraTatCaSo(nv.gioLamTrongThang,'#error_all_number_gioLamTrongThang');
    //Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(nv.maNhanVien,'#error_min_max_length_maNhanVien',4,6);
    //Kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(nv.luongCoBan,'#error_min_max_value_luongCoBan',1000000,20000000) & kiemTra.kiemTraGiaTri(nv.gioLamTrongThang,'#error_min_max_value_gioLamTrongThang',50,150);    

    if(valid != true) {
        return;
    }

    mangNhanVien.push(nv);
    console.log('mangNhanVien', mangNhanVien);

    renderTableNhanVien(mangNhanVien);
}


    

function renderTableNhanVien(mangNV) {
    var sHTML = '';
    for (var index = 0; index < mangNV.length; index++) {
        var nhanVien = mangNV[index];
        sHTML += `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoBan}</td>
                <td>${nhanVien.tongLuong}</td>
                <td>${nhanVien.gioLamTrongThang}</td>
                <td>${nhanVien.xepLoaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')" > Xoá </button>
                </td>
            </tr>
        `
    };
    console.log('shtml', sHTML);
    document.querySelector('#tblNhanVien').innerHTML = sHTML;
}

function xoaNhanVien(maNVClick) {
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nv = mangNhanVien[index];
        if (nv.maNhanVien === maNVClick) {
            mangNhanVien.splice(index, 1);
        }
    }

    renderTableNhanVien(mangNhanVien);
}


