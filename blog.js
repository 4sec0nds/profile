// --- DỮ LIỆU BÀI VIẾT (Thêm bài mới tại đây) ---
let blogPosts = []; // Tạo biến rỗng để chứa dữ liệu

// 1. Hàm tải dữ liệu từ file JSON
async function loadBlogData() {
    try {
        const response = await fetch('data.json'); // Gọi file json
        const data = await response.json();        // Đọc dữ liệu
        blogPosts = data.blogs;                    // Lấy phần 'blogs' gán vào biến
        renderBlogs();                             // Vẽ giao diện sau khi có dữ liệu
    } catch (error) {
        console.error("Lỗi tải dữ liệu Blog:", error);
    }
}

// --- HÀM 1: HIỂN THỊ DANH SÁCH BLOG ---
function renderBlogs() {
    const container = document.getElementById('blog-list');
    if (!container) return; // Nếu không tìm thấy khung thì dừng
    container.innerHTML = '';

    blogPosts.forEach(post => {
        const html = `
            <div class="blog-card" onclick="viewPost(${post.id})">
                <div class="blog-thumb">
                    <div class="blog-date">
                        <span class="date-num">${post.date}</span>
                        <span class="date-month">${post.month}</span>
                    </div>
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-content">
                    <span class="blog-cat">${post.category}</span>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-desc">${post.desc}</p>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// --- HÀM 2: XEM CHI TIẾT BÀI VIẾT ---
function viewPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    // 1. Ẩn danh sách, Hiện chi tiết
    document.getElementById('blog-list').style.display = 'none';
    document.getElementById('blog-detail').style.display = 'block';

    // 2. Điền nội dung vào khung chi tiết
    const detailDiv = document.getElementById('detail-content');
    detailDiv.innerHTML = `
        <div class="detail-header">
            <span class="blog-cat" style="color: #2563eb; font-weight:bold;">${post.category}</span>
            <h1 class="detail-title">${post.title}</h1>
            <div class="detail-meta">
                <span><i class="fa-regular fa-calendar"></i> ${post.date} ${post.month}</span>
                <span><i class="fa-regular fa-user"></i> Hoàng Đam</span>
            </div>
        </div>
        <img src="${post.image}" class="detail-img">
        <div class="detail-body">
            ${post.content}
        </div>
    `;

    // 3. Cuộn lên đầu tab
    // Tìm phần tử cha đang scroll (thường là tab-pane hoặc window)
    const activeTab = document.querySelector('.tab-pane.active');
    if (activeTab) activeTab.scrollTop = 0;
}

// --- HÀM 3: QUAY LẠI DANH SÁCH ---
function closePost() {
    document.getElementById('blog-detail').style.display = 'none';
    document.getElementById('blog-list').style.display = 'grid'; // Quan trọng: Trả về 'grid'
}

// --- CHẠY NGAY KHI WEB TẢI XONG ---
document.addEventListener('DOMContentLoaded', renderBlogs);
// --- QUAN TRỌNG: Gọi hàm loadBlogData khi web tải xong ---
document.addEventListener('DOMContentLoaded', loadBlogData);