// Сетка — очень мелкая, едва заметная, с мерцающими узлами
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

let time = 0;
const nodes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateNodes();
}

function generateNodes() {
    nodes.length = 0;
    const step = 45;
    const cols = Math.ceil(canvas.width / step) + 2;
    const rows = Math.ceil(canvas.height / step) + 2;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            nodes.push({
                x: i * step - step/2,
                y: j * step - step/2,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
}

function drawGrid() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // Линии
    ctx.strokeStyle = 'rgba(66, 245, 188, 0.02)';
    ctx.lineWidth = 0.5;
    const step = 45;
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
    
    // Мерцающие узлы
    for (const node of nodes) {
        const opacity = 0.03 + Math.sin(time * 0.002 + node.phase) * 0.02;
        ctx.fillStyle = `rgba(66, 245, 188, ${Math.max(0.01, opacity)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    time++;
    requestAnimationFrame(() => drawGrid());
}

window.addEventListener('resize', () => {
    resizeCanvas();
});

resizeCanvas();
drawGrid();

// Платформы
const platformBtns = document.querySelectorAll('.platform-btn');
const platformName = document.getElementById('platformName');
const platformDesc = document.getElementById('platformDesc');
const downloadBtn = document.getElementById('downloadBtn');

const platforms = {
    windows: {
        name: 'Windows 10/11',
        desc: 'Установщик 12 МБ • Требуются разрешения',
        file: 'Node_Setup.exe'
    },
    android: {
        name: 'Android 10+',
        desc: 'APK 14 МБ • Из неизвестных источников',
        file: 'Node_App.apk'
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
    platformName.textContent = p.name;
    platformDesc.textContent = p.desc;
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