const WHATSAPP_NUMBER = "5549984114896";

// 1. STATUS EM TEMPO REAL ("ABERTO AGORA" / "FECHADO AGORA")
function updateGymLiveStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Dom, 1 = Seg, ..., 6 = Sáb
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeDecimal = hour + (minutes / 60);

    let isOpen = false;
    let statusScheduleText = "";

    // Destaca a linha correspondente na tabela de horários
    const rowWeekday = document.getElementById('schedule-row-weekday');
    const rowSat = document.getElementById('schedule-row-sat');
    const rowSun = document.getElementById('schedule-row-sun');

    [rowWeekday, rowSat, rowSun].forEach(el => {
        if (el) el.classList.remove('border-olimpus-gold', 'bg-olimpus-gold/10');
    });

    if (day >= 1 && day <= 5) {
        // Segunda a Sexta: 05:00 às 00:00 (24:00)
        isOpen = currentTimeDecimal >= 5 && currentTimeDecimal < 24;
        statusScheduleText = "Hoje (Seg-Sex): 05h às 00h";
        if (rowWeekday) rowWeekday.classList.add('border-olimpus-gold', 'bg-olimpus-gold/10');
    } else if (day === 6) {
        // Sábado: 08:00 às 18:00
        isOpen = currentTimeDecimal >= 8 && currentTimeDecimal < 18;
        statusScheduleText = "Hoje (Sábado): 08h às 18h";
        if (rowSat) rowSat.classList.add('border-olimpus-gold', 'bg-olimpus-gold/10');
    } else {
        // Domingo: 09:00 às 13:00
        isOpen = currentTimeDecimal >= 9 && currentTimeDecimal < 13;
        statusScheduleText = "Hoje (Domingo): 09h às 13h";
        if (rowSun) rowSun.classList.add('border-olimpus-gold', 'bg-olimpus-gold/10');
    }

    const badge = document.getElementById('live-status-badge');
    const dot = document.getElementById('live-status-dot');
    const text = document.getElementById('live-status-text');
    const info = document.getElementById('live-hours-info');

    if (info) info.textContent = statusScheduleText;

    if (isOpen) {
        badge.className = "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-700 border border-emerald-500/30";
        dot.className = "w-2 h-2 rounded-full bg-emerald-600 animate-ping";
        text.textContent = "ABERTO AGORA";
    } else {
        badge.className = "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-700 border border-amber-500/30";
        dot.className = "w-2 h-2 rounded-full bg-amber-600";
        text.textContent = "FECHADO AGORA";
    }
}

// 2. HEADER GLASSMORPHISM AO ROLAR + MENU MOBILE
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('glass-header', 'py-3', 'shadow-md');
        header.classList.remove('py-4');
    } else {
        header.classList.remove('glass-header', 'py-3', 'shadow-md');
        header.classList.add('py-4');
    }
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');

function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-xmark');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.classList.remove('fa-xmark');
        mobileMenuIcon.classList.add('fa-bars');
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// 3. CONTADORES ANIMADOS NA HERO SECTION
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 45;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.max(1, Math.ceil(target / speed));

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count;
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
}

// 4. FILTRO INTERATIVO DE MODALIDADES (TEMA CLARO)
const modalityTabs = document.querySelectorAll('.modality-tab');
const modalityCards = document.querySelectorAll('.modality-card');

modalityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        modalityTabs.forEach(t => {
            t.className = "modality-tab px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-olimpus-surface text-zinc-700 hover:text-olimpus-gold border border-zinc-300 transition";
        });
        tab.className = "modality-tab active px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-olimpus-gold text-white shadow-gold transition";

        modalityCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'todos' || category.includes(filter)) {
                card.classList.remove('filter-hidden');
            } else {
                card.classList.add('filter-hidden');
            }
        });
    });
});

// 5. FILTRO INTERATIVO DE PLANOS (TEMA CLARO)
const planTabs = document.querySelectorAll('.plan-tab');
const planCards = document.querySelectorAll('.plan-card');

planTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-plan-filter');

        planTabs.forEach(t => {
            t.className = "plan-tab px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-olimpus-card text-zinc-700 hover:text-olimpus-gold border border-zinc-300 transition";
        });
        tab.className = "plan-tab active px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-olimpus-gold text-white shadow-gold transition";

        planCards.forEach(card => {
            const categories = card.getAttribute('data-plan-category');
            if (filter === 'todos' || categories.includes(filter)) {
                card.classList.remove('filter-hidden');
            } else {
                card.classList.add('filter-hidden');
            }
        });
    });
});

// 6. MODAL DE SELEÇÃO DE PLANO DIRETO PARA WHATSAPP
let selectedPlanName = "";
const planModal = document.getElementById('plan-modal');
const modalPlanTitle = document.getElementById('modal-plan-title');
const modalPlanForm = document.getElementById('modal-plan-form');

function selectPlanForWhatsApp(planName) {
    selectedPlanName = planName;
    modalPlanTitle.textContent = planName;
    planModal.classList.remove('hidden');
    planModal.classList.add('flex');
    document.getElementById('modal-user-name').focus();
}

function closePlanModal() {
    planModal.classList.add('hidden');
    planModal.classList.remove('flex');
}

modalPlanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('modal-user-name').value.trim();
    const userNote = document.getElementById('modal-user-note').value.trim();

    if (!userName) return;

    let message = `Olá, equipe Olimpus Group! 👋\n\nMeu nome é *${userName}* e quero garantir o plano:\n🏆 *${selectedPlanName}*`;
    if (userNote) {
        message += `\n📝 Obs: ${userNote}`;
    }
    message += `\n\nComo faço para finalizar minha matrícula?`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closePlanModal();
});

// 7. QUIZ INTERATIVO "DESCUBRA SEU PLANO IDEAL"
const quizModal = document.getElementById('quiz-modal');
function openQuizModal() {
    quizModal.classList.remove('hidden');
    quizModal.classList.add('flex');
}
function closeQuizModal() {
    quizModal.classList.add('hidden');
    quizModal.classList.remove('flex');
}

function calculateIdealPlan() {
    const age = document.getElementById('quiz-age').value;
    const focus = document.getElementById('quiz-focus').value;

    let title = "";
    let desc = "";

    if (age === 'estudante') {
        title = "STUDENTS PASS (1ª parcela R$ 29,90)";
        desc = "Exclusivo para estudantes de 12 a 18 anos! Treine de Seg a Sex das 09h às 17h e Sáb/Dom livre com Olimpus App e Voucher Amigo.";
    } else if (focus === 'musculacao') {
        title = "PLANO OLIMPUS (1º mês R$ 69,90)";
        desc = "Nosso campeão de vendas! Musculação livre todos os dias, Sala de Poses, Olimpus App e direito a 5 convidados por mês sem taxa de adesão.";
    } else if (focus === 'misto') {
        title = "PLANO PLUS (1º mês R$ 99,90)";
        desc = "Ideal para variar os estímulos: inclui Musculação livre + CrossFit 1x/semana + Pilates 2x/mês + Avaliação Física.";
    } else if (focus === 'crossfit') {
        title = "CROSSFIT + ACADEMIA (R$ 339,90/mês)";
        desc = "Performance máxima com acesso todos os dias ao Box de CrossFit e à Musculação completa.";
    } else if (focus === 'tudo') {
        title = "PLANO POWER VIP (R$ 399,90/mês)";
        desc = "Experiência completa: CrossFit e Musculação todos os dias + Pilates 4x/mês + Sala de Poses + Avaliação Física.";
    } else {
        title = "STUDIO PILATES (R$ 249,90/mês)";
        desc = "2 aulas por semana com agendamento via App, zero taxa de matrícula e zero manutenção anual.";
    }

    const resultBox = document.getElementById('quiz-result');
    document.getElementById('quiz-result-title').textContent = title;
    document.getElementById('quiz-result-desc').textContent = desc;
    resultBox.classList.remove('hidden');

    const ctaBtn = document.getElementById('quiz-result-cta');
    ctaBtn.onclick = () => {
        closeQuizModal();
        selectPlanForWhatsApp(title);
    };
}

// 8. MÁSCARA DE TELEFONE E VALIDAÇÃO DO FORMULÁRIO DE AULA EXPERIMENTAL / CADASTRO
const phoneInput = document.getElementById('lead-phone');
phoneInput.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

const leadForm = document.getElementById('lead-form');
const formFeedback = document.getElementById('form-feedback');

leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('lead-name').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const modality = document.getElementById('lead-modality').value;
    const goal = document.getElementById('lead-goal').value;
    const shift = document.querySelector('input[name="lead-shift"]:checked').value;

    if (name.length < 3 || phone.length < 14) {
        formFeedback.className = "rounded-xl p-4 text-sm font-medium bg-red-500/15 border border-red-500/30 text-red-700 block";
        formFeedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Por favor, preencha seu nome completo e um WhatsApp válido com DDD.`;
        return;
    }

    formFeedback.className = "rounded-xl p-4 text-sm font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 block";
    formFeedback.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i>Cadastro validado! Redirecionando para o WhatsApp oficial da Olimpus Group...`;

    const text = `Olá, Olimpus Group! 🏋️‍♂️\n\nFiz meu cadastro prévio pelo site:\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${phone}\n🎯 *Interesse:* ${modality}\n🔥 *Objetivo:* ${goal}\n⏰ *Turno preferido:* ${shift}\n\nGostaria de confirmar meu atendimento!`;

    setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    }, 600);
});

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === planModal) closePlanModal();
    if (e.target === quizModal) closeQuizModal();
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    updateGymLiveStatus();
    setInterval(updateGymLiveStatus, 60000);
    initCounters();
});

const heroVideo = document.getElementById('hero-video');

if (heroVideo) {
    heroVideo.muted = true;

    // Reinicia o vídeo antes do ecrã preto final (aos 21.2 segundos)
    heroVideo.addEventListener('timeupdate', () => {
        if (heroVideo.currentTime >= 21.2) {
            heroVideo.currentTime = 0;
            heroVideo.play();
        }
    });
}