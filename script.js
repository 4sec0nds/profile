function showTab(tabId) {
    // 1. Ẩn tất cả các tab nội dung
    const contents = document.querySelectorAll('.tab-pane');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // 2. Xóa trạng thái active của menu
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // 3. Hiển thị tab được chọn
    document.getElementById(tabId).classList.add('active');

    // 4. Highlight icon menu tương ứng
    // Tìm button menu có onclick chứa id tương ứng
    const activeBtn = document.querySelector(`button[onclick="showTab('${tabId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}






//secret
// --- TÍNH NĂNG BÍ MẬT: BẤM AVATAR 5 LẦN ĐỂ ĐĂNG NHẬP ---

let clickCount = 0;
let clickTimer;
const avatar = document.getElementById('my-avatar');
const loginModal = document.getElementById('secret-login-modal');

if (avatar) {
    avatar.style.cursor = "pointer"; // Biến con trỏ thành hình bàn tay

    avatar.addEventListener('click', () => {
        clickCount++;

        // Nếu đã có bộ đếm giờ thì xóa đi để đếm lại từ đầu
        clearTimeout(clickTimer);

        // Sau 2 giây không bấm nữa thì reset về 0
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 2000);

        // Nếu bấm đủ 5 lần
        if (clickCount === 16) {
            loginModal.style.display = 'flex'; // Hiện bảng đăng nhập
            clickCount = 0; // Reset luôn
        }
    });
}

// Hàm đóng bảng đăng nhập
function closeLogin() {
    loginModal.style.display = 'none';
    document.getElementById('login-msg').innerText = "";
}

// Hàm kiểm tra mật khẩu
function checkAdmin() {
    const pass = document.getElementById('admin-pass').value;

    // ĐẶT MẬT KHẨU CỦA BẠN Ở ĐÂY (Ví dụ: 123456)
    if (pass === "123456") {
        document.getElementById('login-msg').innerText = "Đang chuyển hướng...";
        document.getElementById('login-msg').style.color = "#4ade80";

        // THAY LINK DƯỚI BẰNG LINK EDIT FILE DATA.JSON TRÊN GITHUB CỦA BẠN
        // Ví dụ: https://github.com/TenCuaBan/TenRepo/edit/main/data.json
        window.location.href = "LINK_GITHUB_CUA_BAN_O_DAY";
    } else {
        document.getElementById('login-msg').innerText = "Sai mật khẩu!";
        document.getElementById('login-msg').style.color = "red";
    }
}