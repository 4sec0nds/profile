// --- DỮ LIỆU DỰ ÁN (Thêm dự án của bạn vào đây) ---
let projects = []; // Biến rỗng

// 1. Hàm tải dữ liệu Works
async function loadWorksData(filter = 'all') {
    try {
        // Chỉ tải 1 lần nếu biến projects đang rỗng
        if (projects.length === 0) {
            const response = await fetch('data.json');
            const data = await response.json();
            projects = data.works; // Lấy phần 'works' trong file json
        }
        renderWorks(filter); // Vẽ giao diện
    } catch (error) {
        console.error("Lỗi tải dữ liệu Works:", error);
    }
}

// --- HÀM RENDER DỰ ÁN ---
function renderWorks(filter = 'all') {
    const container = document.getElementById('works-grid');
    if (!container) return;

    container.innerHTML = ''; // Xóa cũ

    projects.forEach(project => {
        // Kiểm tra bộ lọc (Nếu chọn 'all' hoặc đúng loại thì mới hiện)
        if (filter === 'all' || project.category === filter) {
            const html = `
                <div class="work-item show" onclick="window.open('${project.link}', '_blank')">
                    <div class="work-img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="work-info">
                        <span class="work-cat">${project.category}</span>
                        <h3 class="work-title">${project.title}</h3>
                        <div class="work-link">
                            Xem chi tiết <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        }
    });
}

// 3. Xử lý nút bấm bộ lọc
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        renderWorks(filterValue); // Gọi hàm render với bộ lọc mới
    });
});

// Chạy lần đầu (Hiện tất cả)
document.addEventListener('DOMContentLoaded', () => renderWorks('all'));
// --- Gọi hàm loadWorksData khi tải xong ---
document.addEventListener('DOMContentLoaded', () => loadWorksData('all'));