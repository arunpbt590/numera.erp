/*
 * यह JavaScript फ़ाइल लॉगिन और डैशबोर्ड की कार्यक्षमता को संभालती है।
 * यह पेज को गतिशील (dynamic) बनाती है।
 */

document.addEventListener('DOMContentLoaded', () => {
    // आवश्यक DOM तत्वों को प्राप्त करें
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const errorMessage = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-btn');
    const studentMenu = document.getElementById('student-menu');
    const facultyMenu = document.getElementById('faculty-menu');
    const userInfo = document.getElementById('user-info');
    const mainTitle = document.getElementById('main-title');
    const userDashboards = document.querySelectorAll('.user-dashboard');

    // लॉगिन फॉर्म सबमिशन को संभालें
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;

        // डेमो के लिए सरल लॉगिन सत्यापन
        if (password === '123') {
            if (username === 'student') {
                showDashboard('student');
            } else if (username === 'faculty') {
                showDashboard('faculty');
            } else {
                showError('उपयोगकर्ता नाम या पासवर्ड गलत है।');
            }
        } else {
            showError('उपयोगकर्ता नाम या पासवर्ड गलत है।');
        }
    });

    // लॉगआउट बटन को संभालें
    logoutBtn.addEventListener('click', () => {
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    // डैशबोर्ड दिखाएं और उपयोगकर्ता के अनुसार मेनू और जानकारी सेट करें
    function showDashboard(userType) {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        
        // मेनू आइटम दिखाएं या छिपाएं
        if (userType === 'student') {
            studentMenu.classList.remove('hidden');
            facultyMenu.classList.add('hidden');
            userInfo.textContent = 'नमस्ते, छात्र!';
            showContent('student-dashboard');
        } else if (userType === 'faculty') {
            facultyMenu.classList.remove('hidden');
            studentMenu.classList.add('hidden');
            userInfo.textContent = 'नमस्ते, शिक्षक!';
            showContent('faculty-dashboard');
        }
    }

    // सामग्री (content) को बदलें और नेविगेशन को अपडेट करें
    function showContent(sectionId) {
        userDashboards.forEach(dashboard => {
            dashboard.classList.add('hidden');
            dashboard.classList.remove('active-user-dashboard');
        });

        const targetDashboard = document.getElementById(sectionId);
        if (targetDashboard) {
            targetDashboard.classList.remove('hidden');
            targetDashboard.classList.add('active-user-dashboard');
            // शीर्षक (title) को अपडेट करें
            mainTitle.textContent = targetDashboard.id.includes('student') ? 'छात्र डैशबोर्ड' : 'शिक्षक डैशबोर्ड';
        }

        // नेविगेशन लिंक को अपडेट करें (केवल सक्रिय के लिए)
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => item.classList.remove('active-link'));
        const activeLink = document.querySelector(`[data-section="${sectionId.replace('-dashboard', '')}"]`);
        if (activeLink) {
            activeLink.classList.add('active-link');
        }
    }

    // नेविगेशन लिंक पर क्लिक को संभालें
    const studentNavItems = document.querySelectorAll('.nav-item-student');
    studentNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // भविष्य में यहां नेविगेशन लॉजिक जोड़ा जा सकता है
        });
    });

    const facultyNavItems = document.querySelectorAll('.nav-item-faculty');
    facultyNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // भविष्य में यहां नेविगेशन लॉजिक जोड़ा जा सकता है
        });
    });
    
    // त्रुटि संदेश दिखाएं
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});
