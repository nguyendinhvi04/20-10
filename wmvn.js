let userName = '';
let qrCodeInstance = null;

function showCard() {
    userName = document.getElementById('nameInput').value.trim();

    if (!userName) {
        alert('Vui lòng nhập tên của bạn! 🌸');
        return;
    }

    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('cardScreen').classList.add('active');
    const nameSpans = document.querySelectorAll('.nameInLetter');
    nameSpans.forEach(span => span.textContent = userName);
}

document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        showCard();
    }
});

function showQRModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('active');
    const url = window.location.href.split('?')[0];
    document.getElementById('shareLink').textContent = url;
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    qrCodeInstance = new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#7A4B3A",
        colorLight: "#FFF8F2",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function closeQRModal() {
    document.getElementById('qrModal').classList.remove('active');
}

function copyLink() {
    const url = window.location.href.split('?')[0];
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Đã copy!';
    btn.style.background = 'linear-gradient(135deg, #7BC96F 0%, #5DA271 100%)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Close modal when clicking outside
document.getElementById('qrModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeQRModal();
    }
});

function shareCard() {
    const url = window.location.href.split('?')[0];
    const text = `Chúc mừng ngày Phụ nữ Việt Nam 20/10! 🌸 Nhận lời chúc của bạn tại đây:`;

    if (navigator.share) {
        navigator.share({
            title: 'Lời chúc 20/10',
            text: text,
            url: url
        }).catch(() => {});
    } else {
        showQRModal();
    }
}

function resetCard() {
    document.getElementById('cardScreen').classList.remove('active');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    document.getElementById('nameInput').value = '';
}
