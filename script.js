// ==========================================
// 1. LANGUAGE & GLOBAL STATE DICTIONARY
// ==========================================
const translations = {
    en: { settings_title: "PULSE SETTINGS", label_appearance: "Appearance", label_language: "System Language", incognito_title: "Incognito Pulse" },
    es: { settings_title: "AJUSTES DE PULSO", label_appearance: "Apariencia", label_language: "Idioma del Sistema", incognito_title: "Pulso Incógnito" },
    fr: { settings_title: "PARAMÈTRES PULSE", label_appearance: "Apparence", label_language: "Langue du Système", incognito_title: "Pulse Incognito" }
};

// ==========================================
// 2. DATA ARCHITECTURE (Social & Privacy)
// ==========================================
const chats = [
    { id: 1, name: 'Jessica Griffin', message: 'typing...', time: '11:25 AM', avatar: 'https://i.pravatar.cc/150?u=jessica', status: 'online', unread: 0, isTyping: true, isAccepted: true },
    { id: 2, name: 'Boss Clintzy', message: 'The mobile site is live! 🍊', time: '12:45 AM', avatar: 'https://i.pravatar.cc/150?u=clint', status: 'online', unread: 1, isTyping: false, isAccepted: true },
    { id: 3, name: 'AfriDev Team', message: 'Ada: We need to finalize...', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=team', status: 'away', unread: 27, isTyping: false, isAccepted: true }
];

const messageRequests = [
    { id: 101, name: 'Shadow_Rec', message: 'Wants to send a Wave', avatar: 'https://i.pravatar.cc/150?u=unknown' }
];

const blockedUsers = []; 

// ==========================================
// 3. THE PULSE ENGINE (Theme & Language)
// ==========================================
function setTheme(theme) {
    // Remove old themes
    document.body.classList.remove('theme-oled', 'theme-grey', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    
    // OLED specifically forces black bg, Light forces white
    if(theme === 'oled') document.body.style.backgroundColor = "#000000";
    if(theme === 'light') document.body.style.backgroundColor = "#ffffff";
    
    localStorage.setItem('pulse_theme', theme);
    
    // Update button borders if they exist on the current page
    document.querySelectorAll('#theme-selector button').forEach(btn => {
        btn.style.borderColor = btn.id === `btn-${theme}` ? '#F57C00' : 'transparent';
    });
}

function changeLanguage(lang) {
    localStorage.setItem('pulse_lang', lang);
    
    // Apply translations to all elements with [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

function savePrivacy(status) {
    localStorage.setItem('pulse_incognito', status);
    console.log(`Privacy Update: Incognito is now ${status}`);
}

// ==========================================
// 4. CHAT & CONNECTION LOGIC
// ==========================================
function blockUser(userId, name) {
    if (confirm(`Restrict ${name}?`)) {
        blockedUsers.push(userId);
        const chatIndex = chats.findIndex(c => c.id === userId);
        if (chatIndex > -1) chats.splice(chatIndex, 1);
        renderChats();
        updateRequestPanel();
    }
}

function renderChats(filter = "") {
    const container = document.getElementById('active-chats') || document.getElementById('chat-list');
    if (!container) return;

    const filtered = chats.filter(chat => 
        chat.isAccepted && 
        !blockedUsers.includes(chat.id) &&
        chat.name.toLowerCase().includes(filter.toLowerCase())
    );

    container.innerHTML = filtered.map(chat => `
        <div class="chat-row flex items-center p-4 active:bg-zinc-900 transition-all cursor-pointer border-b border-white/5" onclick="openConversation(${chat.id})">
            <div class="relative">
                <div class="w-14 h-14 rounded-2xl p-0.5 ${chat.status === 'online' ? 'bg-[#F57C00]' : 'bg-zinc-700'}">
                    <img src="${chat.avatar}" class="w-full h-full rounded-2xl bg-black border-2 border-black object-cover">
                </div>
            </div>
            <div class="ml-4 flex-1">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-white text-sm">${chat.name}</h3>
                    <span class="text-zinc-500 text-[10px] uppercase">${chat.time}</span>
                </div>
                <p class="text-xs ${chat.isTyping ? 'text-[#F57C00] font-bold' : 'text-zinc-500'}">
                    ${chat.isTyping ? 'Typing...' : chat.message}
                </p>
            </div>
        </div>
    `).join('');
}

function updateRequestPanel() {
    const countEl = document.getElementById('req-count');
    if (countEl) countEl.innerText = messageRequests.length;
}

// ==========================================
// 5. GLOBAL PAGE NAVIGATION (Connector)
// ==========================================
function navigateTo(pageId) {
    // Hide all main sections
    const sections = ['home-section', 'chat-page', 'vault-page', 'settings-page', 'profile-page'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.classList.add('hidden');
    });

    // Show target section
    const target = document.getElementById(pageId);
    if(target) target.classList.remove('hidden');
    
    // Refresh Lucide icons for new content
    if(window.lucide) lucide.createIcons();
}

// ==========================================
// 6. SYSTEM INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Preferences
    const savedTheme = localStorage.getItem('pulse_theme') || 'oled';
    setTheme(savedTheme);
    
    const savedLang = localStorage.getItem('pulse_lang') || 'en';
    const langPicker = document.getElementById('language-select');
    if(langPicker) langPicker.value = savedLang;
    changeLanguage(savedLang);
    
    const savedPrivacy = localStorage.getItem('pulse_incognito') === 'true';
    const privacyToggle = document.getElementById('incognito-toggle');
    if(privacyToggle) privacyToggle.checked = savedPrivacy;

    // 2. Initialize UI Components
    renderChats();
    updateRequestPanel();

    // 3. Search Bar Sync
    const searchBar = document.getElementById('chat-search');
    if(searchBar) {
        searchBar.addEventListener('input', (e) => renderChats(e.target.value));
    }

    if (window.lucide) lucide.createIcons();
    console.log("Pulse Pro Engine: Online & Connected.");
});
