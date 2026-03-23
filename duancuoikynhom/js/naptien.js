//nap
const user = JSON.parse(sessionStorage.getItem("currentUser"));
let tongTien = 0;
let tongKC = 0;
let users, userr;
const nutDangNhap = document.getElementById("nut-dang-nhap");
if (!user) {
    document.getElementById("ten-nguoi-choi").textContent = "Chưa đăng nhập";
    document.getElementById("luong-hientai").textContent = "0";
    nutDangNhap.textContent = "Đăng nhập";
    nutDangNhap.onclick = () => {
        window.location.href = "dangnhap.html";
    };
} else {
    users = JSON.parse(localStorage.getItem("users")) || [];
    userr = users.find(u => u.email === user.email);
    document.getElementById("ten-nguoi-choi").textContent = user.username;
    document.getElementById("luong-hientai").textContent = userr.luong || 0;
    nutDangNhap.textContent = "Đăng xuất";
    nutDangNhap.onclick = logout;

    // Hiển thị lịch sử
    const lichSuNap = userr.history || [];
    let tongLuongDaNap = 0;
    const tbody = document.getElementById("lich-su-nap");
    tbody.innerHTML = lichSuNap.map(log => {
        tongLuongDaNap += log.luong;
        const thoiGian = new Date(log.time).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh"
        });
        return `<tr>
        <td>${thoiGian}</td>
        <td>${log.luong}</td>
        <td>${log.vnd.toLocaleString()}</td>
        </tr>`;
    }).join('');
    // Gắn cấp bậc vào giao diện
    const capBac = document.getElementById("cap-bac");
    capBac.textContent = getCapBac(tongLuongDaNap);
}
function themGoi(soTien) {
    tongTien += soTien;
    switch (soTien){
        case 50000:tongKC+=250; break
        case 100000:tongKC+=500; break
        case 200000:tongKC+=1050; break
        case 500000:tongKC+=2825; break
        case 888888:tongKC+=5825; break
        case 1000000:tongKC+=5825; break
    }
    document.getElementById("tong-nap").textContent = `Tổng tiền: ${tongTien.toLocaleString()} VNĐ | Tổng Lượng: ${tongKC}`;
}

function napTien() {
    if (!user) {
        alert("Bạn cần đăng nhập để nạp tiền!");
        window.location.href = "dangnhap.html";
        return;
    }
    if (tongTien === 0) {
        showToast("⚠️ Bạn chưa chọn gói nạp nào.");
        return;
    }
    document.getElementById("overlay-online").style.display= "block"
    document.getElementById("xac-nhan-popup").style.display = "block";
}
function dongPopup() {
    document.getElementById("overlay-online").style.display= "none"
    document.getElementById("xac-nhan-popup").style.display = "none";
}

function xacNhanChuyenKhoan() {
    dongPopup();
    showToast("⏳ Đang xác nhận giao dịch...");

    setTimeout(() => {
        userr.luong = (userr.luong || 0) + tongKC;
        userr.history = userr.history || [];
        userr.history.push({
            time: new Date().toISOString(),
            luong: tongKC,
            vnd: tongTien
        });
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("luong-hientai").textContent = userr.luong;
        showToast(`✅ Nạp thành công ${tongKC} Lượng!`);
        tongTien = 0;
        tongKC = 0;
        document.getElementById("tong-nap").textContent = `Tổng tiền: 0 VNĐ | Tổng Lượng: 0`;

        // Cập nhật lịch sử
        let tongLuongDaNap = 0;
        const tbody = document.getElementById("lich-su-nap");
        tbody.innerHTML = userr.history.map(log => {
            tongLuongDaNap += log.luong;
            const thoiGian = new Date(log.time).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh"
            });
            return `<tr>
                <td>${thoiGian}</td>
                <td>${log.luong}</td>
                <td>${log.vnd.toLocaleString()}</td>
            </tr>`;
        }).join('');

        // Cập nhật cấp bậc
        const capBac = document.getElementById("cap-bac");
        capBac.textContent = getCapBac(tongLuongDaNap);
        }, 3000);
}

// Xác định cấp bậc
function getCapBac(tong) {
    if (tong < 1000) return "VIP 0";
    if (tong < 5000) return "VIP 1";
    if (tong < 10000) return "VIP 2";
    if (tong < 20000) return "VIP 3";
    if (tong < 50000) return "VIP 4";
    if (tong < 100000) return "VIP 5";
    if (tong < 200000) return "VIP 6";
    if (tong < 300000) return "VIP 7";
    if (tong < 500000) return "VIP 8";
    if (tong >= 500000) return "👑 Ninja Huyền Thoại";
}
function logout() {
    sessionStorage.removeItem("currentUser");
    showToast("✅ Đăng xuất thành công!");
    setTimeout(() => location.reload(), 1000); 
}