// --- script.js ---

// Giữ nguyên hàm showTab cũ ở trên...
function showTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    const btn = document.querySelector(`button[onclick="showTab('${tabId}')"]`);
    if (btn) btn.classList.add('active');
}

// --- THÊM PHẦN XỬ LÝ GỬI FORM VỚI MÃ CỦA BẠN ---
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault(); // Ngăn trình duyệt chuyển trang

    var status = document.getElementById("form-status");
    var btn = document.querySelector(".btn-send");
    var data = new FormData(event.target);

    // 1. Hiệu ứng đang gửi
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
    btn.disabled = true;

    // 2. Gửi dữ liệu đến Formspree (Đã điền mã của bạn)
    fetch("https://formspree.io/f/xvzbpwkw", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Thành công
            status.innerHTML = "✅ Cảm ơn! Tin nhắn đã được gửi.";
            status.style.color = "#4ade80";
            status.style.display = "block";
            form.reset(); // Xóa trắng form
        } else {
            // Có lỗi từ server
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = "❌ Lỗi: " + data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "❌ Có lỗi xảy ra, vui lòng thử lại!";
                }
                status.style.color = "#f87171";
                status.style.display = "block";
            })
        }
    }).catch(error => {
        // Lỗi mạng
        status.innerHTML = "❌ Lỗi kết nối!";
        status.style.color = "#f87171";
        status.style.display = "block";
    }).finally(() => {
        // 3. Khôi phục nút bấm
        btn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Gửi Tin Nhắn';
        btn.disabled = false;

        // Ẩn thông báo sau 5 giây
        setTimeout(() => {
            status.style.display = "none";
        }, 5000);
    });
}

form.addEventListener("submit", handleSubmit);