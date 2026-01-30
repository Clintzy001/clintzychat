// Data for the Chat List
const chats = [
    { 
        id: 1, 
        name: 'Jessica Griffin', 
        message: 'typing...', 
        time: '11:25 AM', 
        avatar: 'https://i.pravatar.cc/150?u=jessica', 
        status: 'online', 
        unread: 0,
        isTyping: true 
    },
    { 
        id: 2, 
        name: 'Boss Clintzy', 
        message: 'The mobile site is live! 🍊', 
        time: '12:45 AM', 
        avatar: 'https://i.pravatar.cc/150?u=clint', 
        status: 'online', 
        unread: 1,
        isTyping: false 
    },
    { 
        id: 3, 
        name: 'AfriDev Team', 
        message: 'Ada: We need to finalize the...', 
        time: '10:45 AM', 
        avatar: 'https://i.pravatar.cc/150?u=team', 
        status: 'away', 
        unread: 27,
        isTyping: false 
    },
    { 
        id: 4, 
        name: 'David Adeyemi', 
        message: 'Sent a photo', 
        time: '10:10 AM', 
        avatar: 'https://i.pravatar.cc/150?u=david', 
        status: 'offline', 
        unread: 0,
        isTyping: false 
    }
];

// Function to render the chat list
function renderChats() {
    const chatListContainer = document.getElementById('chat-list');
    
    chatListContainer.innerHTML = chats.map(chat => `
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

// Simple navigation placeholder
function navigate(page) {
    console.log(`Navigating to ${page}`);
    // You can add logic here to switch screens
}

function openConversation(id) {
    alert(`Opening chat with ID: ${id}. Conversation screen coming next!`);
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderChats();
    // Re-initialize icons for dynamic content
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
