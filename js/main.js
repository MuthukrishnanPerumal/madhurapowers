(function () {
    var desktopFooter = window.matchMedia('(min-width: 768px)');
    function syncFooterGroups() {
        document.querySelectorAll('.footer-group').forEach(function (group) {
            group.open = desktopFooter.matches;
        });
    }
    syncFooterGroups();
    desktopFooter.addEventListener('change', syncFooterGroups);
})();

lucide.createIcons();

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    const isOpen = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    openIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu || menu.classList.contains('hidden')) return;
    if (!menu.contains(event.target) && !btn.contains(event.target)) {
        toggleMobileMenu();
    }
});

let selectedPropType = 'residential';
function setPropertyType(type) {
    selectedPropType = type;
    document.querySelectorAll('.prop-btn').forEach(btn => {
        btn.className = "prop-btn py-2 px-1 sm:py-2.5 sm:px-3 border border-slate-200 text-slate-600 font-semibold rounded-xl text-[10px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 hover:border-slate-300 transition-all";
    });
    const activeBtn = document.getElementById(`prop-${type}`);
    activeBtn.className = "prop-btn py-2 px-1 sm:py-2.5 sm:px-3 border border-solar-orange bg-orange-50/50 text-solar-orange font-semibold rounded-xl text-[10px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 transition-all";
    calculateSavings();
}

function calculateSavings() {
    const bill = parseFloat(document.getElementById('bill-input').value);
    const locationFactor = parseFloat(document.getElementById('location-select').value);

    document.getElementById('bill-display').innerText = `$${bill} / mo`;

    let multiplier = selectedPropType === 'residential' ? 0.85 : selectedPropType === 'commercial' ? 0.88 : 0.92;
    const monthlySavings = Math.round(bill * multiplier * (locationFactor / 1.0));
    const annualSavings = monthlySavings * 12;
    const capacity = (bill / 40 * locationFactor).toFixed(1);
    const payback = (5.5 / locationFactor).toFixed(1);
    const co2 = (capacity * 0.65).toFixed(1);

    document.getElementById('res-monthly').innerText = `$${monthlySavings.toLocaleString()}`;
    document.getElementById('res-annual').innerText = `$${annualSavings.toLocaleString()}`;
    document.getElementById('res-capacity').innerText = `${capacity} kW`;
    document.getElementById('res-payback').innerText = `${payback} Yrs`;
    document.getElementById('res-co2').innerText = `${co2} Tons`;
}

function showToast(title, desc) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    toast.classList.remove('translate-x-full', 'translate-x-[120%]', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
    }, 3500);
}

function openModal() {
    document.getElementById('quote-modal').classList.remove('hidden');
    document.getElementById('quote-modal').classList.add('flex');
}

function openModalWithDetails() {
    const bill = document.getElementById('bill-input').value;
    document.getElementById('modal-interest').value = `Solar Calculator Estimate ($${bill}/mo Bill)`;
    openModal();
}

function openModalWithSolution(solutionName) {
    document.getElementById('modal-interest').value = solutionName;
    openModal();
}

function closeModal() {
    document.getElementById('quote-modal').classList.add('hidden');
    document.getElementById('quote-modal').classList.remove('flex');
}

function handleModalSubmit(e) {
    e.preventDefault();
    closeModal();
    showToast("Quote Requested!", "Our solar engineers will contact you within 24 hours.");
}

function handleFormSubmit(e) {
    e.preventDefault();
    e.target.reset();
    showToast("Consultation Submitted!", "Thank you for reaching out to MADHURA POWERS Solar.");
}

function openProductDetails(title, desc, warranty) {
    document.getElementById('spec-title').innerText = title;
    document.getElementById('spec-desc').innerText = desc;
    document.getElementById('spec-warranty').innerText = warranty;
    document.getElementById('spec-modal').classList.remove('hidden');
    document.getElementById('spec-modal').classList.add('flex');
}

function closeSpecModal() {
    document.getElementById('spec-modal').classList.add('hidden');
    document.getElementById('spec-modal').classList.remove('flex');
}

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.classList.toggle('is-visible', window.scrollY > 400);
}

window.addEventListener('scroll', updateBackToTop, { passive: true });

window.onload = function() {
    calculateSavings();
    updateBackToTop();
};
