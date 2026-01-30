// Data for the Chat List
const chats = [
    { id: 1, name: 'Jessica Griffin', message: 'typing...', time: '11:25 AM', avatar: 'https://i.pravatar.cc/150?u=jessica', status: 'online', unread: 0, isTyping: true },
    { id: 2, name: 'Boss Clintzy', message: 'The mobile site is live! 🍊', time: '12:45 AM', avatar: 'https://i.pravatar.cc/150?u=clint', status: 'online', unread: 1, isTyping: false },
    { id: 3, name: 'AfriDev Team', message: 'Ada: We need to finalize the...', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=team', status: 'away', unread: 27, isTyping: false },
    { id: 4, name: 'David Adeyemi', message: 'Sent a photo', time: '10:10 AM', avatar: 'https://i.pravatar.cc/150?u=david', status: 'offline', unread: 0, isTyping: false }
];

// --- 1. RENDER CHATS WITH FILTERING ---
function renderChats(filter = "") {
    const chatListContainer = document.getElementById('chat-list');
    if (!chatListContainer) return;

    const filtered = chats.filter(chat => 
        chat.name.toLowerCase().includes(filter.toLowerCase())
    );

    chatListContainer.innerHTML = filtered.map(chat => `
        <div class="chat-row flex items-center p-4 active:bg-zinc-900 transition-all cursor-pointer" onclick="openConversation(${chat.id})">
            <div class="relative flex-shrink-0">
                <div class="w-14 h-14 rounded-full p-0.5 ${chat.status === 'online' ? 'bg-[#F57C00]' : 'bg-zinc-700'}">
                    <img src="${chat.avatar}" class="w-full h-full rounded-full bg-black border-2 border-black object-cover">
                </div>
                ${chat.status === 'online' ? '<div class="absolute bottom-0 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>' : ''}
            </div>

            <div class="ml-4 flex-1 border-b border-zinc-900/20 pb-2">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-white text-[16px]">${chat.name}</h3>
                    <span class="text-zinc-500 text-[11px] font-medium">${chat.time}</span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm truncate ${chat.isTyping ? 'text-[#F57C00] italic font-medium' : 'text-zinc-400'}">
                        ${chat.message}
                    </p>
                    ${chat.unread > 0 ? `
                        <div class="bg-[#F57C00] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-black border border-black shadow-[0_0_10px_rgba(245,124,0,0.3)]">
                            ${chat.unread}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// --- 2. MENU TOGGLE LOGIC ---
function toggleMoreMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('more-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

window.addEventListener('click', function(e) {
    const menu = document.getElementById('more-menu');
    if (menu && !menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

// --- 3. SEARCH & MESSAGE LOGIC ---
function setupSearchListener() {
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderChats(e.target.value);
        });
    }
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const container = document.getElementById('message-container');
    if (!input || input.value.trim() === "") return;

    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-end";
    msgDiv.innerHTML = `
        <div class="bubble-orange p-3 max-w-[80%] text-sm font-medium">
            ${input.value}
        </div>
    `;

    container.appendChild(msgDiv);
    input.value = "";
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

// --- 4. CONVERSATION WINDOW ---
function openConversation(id) {
    const chat = chats.find(c => c.id === id);
    const windowOverlay = document.getElementById('chat-window');
    
    windowOverlay.innerHTML = `
        <header class="p-4 flex items-center bg-black/95 border-b border-zinc-900">
            <button onclick="closeChat()" class="text-orange-500 mr-2">
                <i data-lucide="chevron-left"></i>
            </button>
            <div class="w-10 h-10 rounded-full border border-orange-500 overflow-hidden">
                <img src="${chat.avatar}" class="w-full h-full object-cover">
            </div>
            <div class="ml-3 flex-1">
                <h4 class="font-bold text-sm">${chat.name}</h4>
                <p class="text-[10px] text-green-500 font-medium tracking-wide uppercase">
                    ${chat.status === 'online' ? 'online' : 'offline'}
                </p>
            </div>
            <div class="flex space-x-4 text-zinc-400">
                <i data-lucide="phone" class="w-5 h-5"></i>
                <i data-lucide="video" class="w-5 h-5"></i>
            </div>
        </header>

        <main id="message-container" class="flex-1 overflow-y-auto p-4 chat-bg space-y-4">
            <div class="flex justify-start">
                <div class="bubble-dark p-3 max-w-[80%] text-sm">Hi Clintzy! How is the app coming along?</div>
            </div>
            <div class="flex justify-end">
                <div class="bubble-orange p-3 max-w-[80%] text-sm font-medium">It's looking fire! 🔥</div>
            </div>
        </main>

        <footer class="p-3 bg-black border-t border-zinc-900 flex items-center space-x-2">
            <button class="text-zinc-500"><i data-lucide="plus"></i></button>
            <input type="text" id="msg-input" placeholder="Type a message..." class="flex-1 bg-zinc-900 rounded-full px-4 py-2 text-sm outline-none focus:border border-orange-500 text-white">
            <button onclick="sendMessage()" class="bg-orange-500 p-2 rounded-full text-black transition-transform active:scale-90">
                <i data-lucide="send"></i>
            </button>
        </footer>
    `;

    windowOverlay.classList.remove('translate-x-full');
    lucide.createIcons();

    document.getElementById('msg-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function closeChat() {
    document.getElementById('chat-window').classList.add('translate-x-full');
}

// --- 5. TAB NAVIGATION (STATUS/CHATS) ---
function navigate(page) {
    const mainContent = document.getElementById('main-scroll');
    
    if (page === 'updates') {
        mainContent.innerHTML = `
            <div class="p-4">
                <h2 class="text-xl font-bold mb-4">Status</h2>
                <div class="flex items-center space-x-4 mb-6" onclick="window.location.href='status.html'">
                    <div class="relative">
                        <div class="w-16 h-16 rounded-full border-2 border-dashed border-orange-500 p-1">
                            <img src="https://i.pravatar.cc/150?u=myprofile" class="rounded-full w-full h-full">
                        </div>
                        <div class="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1 border-2 border-black">
                            <i data-lucide="plus" class="w-3 h-3 text-black"></i>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold">My status</h4>
                        <p class="text-sm text-zinc-500">Tap to add status update</p>
                    </div>
                </div>
                <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Recent updates</p>
                <div class="space-y-4">
                    <div class="flex items-center space-x-4 cursor-pointer" onclick="window.location.href='status.html'">
                        <div class="w-16 h-16 rounded-full border-2 border-orange-500 p-1">
                            <img src="https://i.pravatar.cc/150?u=jessica" class="rounded-full w-full h-full">
                        </div>
                        <div class="flex-1 border-b border-zinc-900 pb-4">
                            <h4 class="font-bold">Jessica Griffin</h4>
                            <p class="text-sm text-zinc-500">Just now</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    } else if (page === 'chats') {
        mainContent.innerHTML = `
            <div class="px-4 py-3">
                <div class="bg-zinc-900/60 border border-zinc-800 rounded-full px-4 py-2.5 flex items-center space-x-3 shadow-inner">
                    <i data-lucide="search" class="w-4 h-4 text-zinc-500"></i>
                    <input type="text" placeholder="Ask Clintzy AI or Search" class="bg-transparent outline-none text-sm w-full text-zinc-300 placeholder-zinc-600">
                </div>
            </div>
            <div id="chat-list" class="divide-y divide-zinc-900/40"></div>
        `;
        renderChats();
        setupSearchListener(); // Re-attach listener after re-rendering search bar
        lucide.createIcons();
    }
}

// --- 6. INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    renderChats();
    setupSearchListener();
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
