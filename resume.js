// --- resume.js ---

async function loadResumeData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // 1. Vẽ phần Education
        renderTimeline(data.resume.education, 'edu-list');

        // 2. Vẽ phần Experience
        renderTimeline(data.resume.experience, 'exp-list');

        // 3. Vẽ phần Skills
        renderSkills(data.resume.skills, 'skills-list');

    } catch (error) {
        console.error("Lỗi tải Resume:", error);
    }
}

// Hàm hỗ trợ vẽ Timeline (Dùng chung cho cả Edu và Exp)
function renderTimeline(items, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = '';

    items.forEach(item => {
        const html = `
            <div class="timeline-item">
                <h4 class="timeline-title">${item.title}</h4>
                <span class="timeline-year">${item.year}</span>
                <p class="timeline-desc">${item.desc}</p>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Hàm hỗ trợ vẽ Skills
function renderSkills(skills, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = '';

    skills.forEach(skill => {
        const html = `
            <div class="skill-item">
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span>${skill.percent}</span>
                </div>
                <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: ${skill.percent};"></div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Chạy hàm khi tải trang
document.addEventListener('DOMContentLoaded', loadResumeData);