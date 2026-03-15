const user = JSON.parse(sessionStorage.getItem("currentUser"));
const nutDangNhap = document.getElementById("nut-dang-nhap");
let users = JSON.parse(localStorage.getItem("users")) || [];
const userr = users.find(u => u.email === user?.email);

const tenUser = document.getElementById("ten-user");
const zeniHienTai = document.getElementById("zeni-hientai");
if (!user) {
    tenUser.textContent = "Chưa đăng nhập";
    zeniHienTai.textContent = "0";
    nutDangNhap.textContent = "Đăng nhập";
    nutDangNhap.onclick = () => {
        window.location.href = "dangnhap.html"; 
    };
} else {
    tenUser.textContent = userr.username;
    zeniHienTai.textContent = userr.kimcuong || 0;
    let tongZeniDaNap = 0;
    userr.history?.forEach(log => {
        tongZeniDaNap += log.zeni;
    });
    document.getElementById("cap-bac").textContent = getCapBac(tongZeniDaNap);
    capNhatLichSu();
    nutDangNhap.textContent = "Đăng xuất";
    nutDangNhap.onclick = logout;
}

// Sinh mã code ngẫu nhiên
function randomCode(length = 10) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        let randomChar = chars[randomIndex];
        result += randomChar;
    }
    return result;
}

// Mua vật phẩm
function muaVatPham(ma, gia) {
    if (!user) {
        showToast("⚠️ Bạn cần đăng nhập!");
        return;
    }
    if ((userr.kimcuong || 0) < gia) {
        showToast("❌ Không đủ Lượng!");
        return;
    }
    userr.items = userr.items || [];
    if (userr.items.find(i => i.id === ma)) {
        showToast("⚠️ Bạn đã mua vật phẩm này rồi!");
        return;
    }

    const code = randomCode();
    const thoiGian = new Date().toLocaleString();

    userr.kimcuong -= gia;
    userr.items.push({ id: ma, code, gia, time: thoiGian });
    localStorage.setItem("users", JSON.stringify(users));
    zeniHienTai.textContent = userr.kimcuong;
    showToast(`✅ Mua thành công! Code: ${code}`);
    capNhatLichSu();
}

// Cập nhật bảng lịch sử mua
function capNhatLichSu() {
    const tbody = document.getElementById("lich-su-mua");
    if (!userr.items) return;
    tbody.innerHTML = userr.items.map(i => `
    <tr>
        <td>${i.time}</td>
        <td>${i.id}</td>
        <td>${i.gia}</td>
        <td><button onclick="copyCode('${i.code}')">📋 Copy</button></td>
    </tr>
    `).join('');
}

// Copy mã
function copyCode(code) {
    navigator.clipboard.writeText(code);
    showToast(`✅ Đã copy mã: ${code}`);
}
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
    return "👑 Ninja Huyền Thoại";
}
function getVipLevel(tong) {
    if (tong < 1000) return 0;
    if (tong < 5000) return 1;
    if (tong < 10000) return 2;
    if (tong < 20000) return 3;
    if (tong < 50000) return 4;
    if (tong < 100000) return 5;
    if (tong < 200000) return 6;
    if (tong < 300000) return 7;
    if (tong < 500000) return 8;
    return 9;
}

function tinhTongZeniNap() {
    let tong = 0;
    userr.history?.forEach(log => tong += log.zeni);
    return tong;
}

function nhanQuaVip(ma, vipYeuCau) {
    if (!user) {
        showToast("⚠️ Bạn cần đăng nhập!");
        return;
    }
    const tong = tinhTongZeniNap();
    const level = getVipLevel(tong);
    if (level < vipYeuCau) {
        showToast("❌ Chưa đủ cấp VIP để nhận gói quà này!");
        return;
    }
    userr.items = userr.items || [];
    if (userr.items.find(i => i.id === ma)) {
        showToast("⚠️ Bạn đã nhận gói này rồi!");
        return;
    }

    const code = randomCode();
    const thoiGian = new Date().toLocaleString();

    userr.items.push({ id: ma, code, gia: 0, time: thoiGian });
    localStorage.setItem("users", JSON.stringify(users));
    showToast("🎁 Nhận gói quà VIP thành công!");
    capNhatLichSu();
}

function muaVipGift(ma, vipYeuCau, gia) {
    if (!user) {
        showToast("⚠️ Bạn cần đăng nhập!");
        return;
    }
    const tong = tinhTongZeniNap();
    const level = getVipLevel(tong);
    if (level < vipYeuCau) {
        showToast("❌ Chưa đủ cấp VIP để mua gói này!");
        return;
    }

    if ((userr.kimcuong || 0) < gia) {
        showToast("❌ Không đủ Lượng để mua!");
        return;
    }
    userr.items = userr.items || [];
    if (userr.items.find(i => i.id === ma)) {
        showToast("⚠️ Bạn đã mua gói này rồi!");
        return;
    }

    const code = randomCode();
    const thoiGian = new Date().toLocaleString();

    userr.kimcuong -= gia;

    userr.items.push({ id: ma, code, gia, time: thoiGian });
    localStorage.setItem("users", JSON.stringify(users));
    zeniHienTai.textContent = userr.kimcuong;
    showToast("🎁 Mua gói VIP thành công!");
    capNhatLichSu();
}
function logout() {
    sessionStorage.removeItem("currentUser");
    showToast("✅ Đăng xuất thành công!");
    setTimeout(() => location.reload(), 1000); 
}
document.getElementById("searchInput").addEventListener("input", function () {
const keyword = this.value.toLowerCase();
const allDiscussions = document.querySelectorAll(".item-card");
allDiscussions.forEach((div) => {
    const text = div.innerText.toLowerCase();
    if (text.includes(keyword)) {
    div.style.display = "block";
    } else {
    div.style.display = "none";
    }
});
});