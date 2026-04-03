// Fade-in Animation Observer
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Back to Top Logic
const topBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) topBtn.style.display = "block";
    else topBtn.style.display = "none";
});

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// PDF Generation Logic
document.getElementById("pdf-indir").addEventListener("click", function () {
    const btn = this;
    const btnText = btn.querySelector('span');
    const originalText = btnText.innerText;
    
    btn.disabled = true;
    btnText.innerText = "Hazırlanıyor...";

    html2canvas(document.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fffdf5"
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Ankara-Rehberi-2026.pdf");
        
        btn.disabled = false;
        btnText.innerText = originalText;
    }).catch(err => {
        console.error("PDF Hatası:", err);
        btn.disabled = false;
        btnText.innerText = "Hata Oluştu";
    });
});