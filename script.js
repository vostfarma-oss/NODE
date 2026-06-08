// Сетка — очень мелкая, едва заметная
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawGrid() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    ctx.strokeStyle = 'rgba(66, 245, 188, 0.025)';
    ctx.lineWidth = 0.5;
    
    const step = 25;
    for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    
    ctx.fillStyle = 'rgba(66, 245, 188, 0.04)';
    for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

window.addEventListener('resize', () => {
    resizeCanvas();
    drawGrid();
});

resizeCanvas();
drawGrid();

// Платформы
const platformBtns = document.querySelectorAll('.platform-btn');
const platformIcon = document.getElementById('platformIcon');
const platformName = document.getElementById('platformName');
const platformDesc = document.getElementById('platformDesc');
const downloadBtn = document.getElementById('downloadBtn');
const btnText = document.querySelector('.btn-text');

const platforms = {
    windows: {
        icon: '💻',
        name: 'Windows 10/11',
        desc: 'Установщик 12 МБ • Дайте разрешения при установке',
        file: 'Node_Setup.exe',
        buttonText: 'Скачать .exe'
    },
    android: {
        icon: '📱',
        name: 'Android 10+',
        desc: 'APK 14 МБ • Установите из неизвестных источников',
        file: 'Node_App.apk',
        buttonText: 'Скачать .apk'
    }
};

let currentPlatform = 'windows';

platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        platformBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPlatform = btn.dataset.platform;
        updateDownloadCard();
    });
});

function updateDownloadCard() {
    const p = platforms[currentPlatform];
    platformIcon.textContent = p.icon;
    platformName.textContent = p.name;
    platformDesc.textContent = p.desc;
    btnText.textContent = p.buttonText;
}

updateDownloadCard();

downloadBtn.addEventListener('click', () => {
    const p = platforms[currentPlatform];
    alert(`Скачивание ${p.file}\n\nФайл появится после выхода версии 1.0`);
});

// Автоопределение ОС
const ua = navigator.userAgent.toLowerCase();
if (ua.includes('android')) {
    document.querySelector('[data-platform="android"]').click();
} else if (ua.includes('win')) {
    document.querySelector('[data-platform="windows"]').click();
}