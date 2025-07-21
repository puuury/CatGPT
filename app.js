// Chat functionality
let isTyping = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Auto-resize textarea
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Enable/disable send button based on input
    textarea.addEventListener('input', function() {
        sendButton.disabled = !this.value.trim();
    });
    
    // Initial state
    sendButton.disabled = true;

    // Modal logic
    const helpIcon = document.getElementById('helpIcon');
    const aboutModal = document.getElementById('aboutModal');
    const closeModal = document.getElementById('closeModal');
    const modalBody = aboutModal.querySelector('.modal-body');
    let modalOpen = false;
    // Persian README text
    const persianReadme = `کت‌جی‌پی‌تی یک چت‌بات بامزه است که فقط با "میوو" جواب می‌دهد! هرچی بنویسی، فقط با مدل‌های مختلفی از "میوو" (به تعداد کلمات پیام خودت!) جواب می‌گیری. این پروژه برای سرگرمی و حمایت از گربه‌های خیابانی ساخته شده و در آینده امکانات بیشتری بهش اضافه می‌کنیم تا واقعا به گربه‌ها کمک کنیم.<br><br>امکانات:<br>• رابط کاربری ساده و دوست‌داشتنی<br>• آواتار گربه و انیمیشن تایپ کردن<br>• هر پیامی فقط با "میوو" جواب داده میشه!<br><br>چطور اجرا کنم؟<br>۱. این مخزن رو دانلود یا کلون کن.<br>۲. فایل index.html رو با مرورگر باز کن. همین!<br><br>دوست داری کمک کنی؟<br>خوشحال می‌شیم اگر پروژه رو فورک کنی، ایده بدی یا حتی فقط سلام کنی! هر پیشنهادی برای بهتر شدن یا کمک واقعی به گربه‌ها رو با آغوش باز می‌پذیریم.<br><br><span style='font-size:1.2em;'>ساخته شده با ❤️ برای همه گربه‌های خیابانی!</span>`;
    function openModal() {
        modalBody.innerHTML = persianReadme;
        aboutModal.style.display = 'flex';
        setTimeout(() => { aboutModal.style.opacity = 1; }, 10);
        helpIcon.innerHTML = '<span>❌</span>';
        helpIcon.setAttribute('title', 'بستن');
        modalOpen = true;
        document.body.style.overflow = 'hidden';
    }
    function closeModalFunc() {
        aboutModal.style.animation = 'modalFadeOut 0.3s';
        aboutModal.style.opacity = 0;
        setTimeout(() => {
            aboutModal.style.display = 'none';
            aboutModal.style.animation = '';
        }, 300);
        helpIcon.innerHTML = '<span>ℹ️</span>';
        helpIcon.setAttribute('title', 'درباره پروژه');
        modalOpen = false;
        document.body.style.overflow = '';
    }
    helpIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!modalOpen) openModal();
        else closeModalFunc();
    });
    closeModal.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModalFunc();
    });
    aboutModal.addEventListener('click', function(e) {
        if (e.target === aboutModal) closeModalFunc();
    });
    document.addEventListener('keydown', function(e) {
        if (modalOpen && (e.key === 'Escape' || e.key === 'Esc')) closeModalFunc();
    });
});

// Handle Enter key press
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send message function
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('sendButton').disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate MEWO response after delay
    setTimeout(() => {
        hideTypingIndicator();
        generateMEWOResponse(message);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🐱';
    const messageContent = `
        <div class="message-content">
            <div class="avatar">${avatar}</div>
            <div class="text">${text}</div>
        </div>
    `;
    
    messageDiv.innerHTML = messageContent;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    const typingContent = `
        <div class="message-content">
            <div class="avatar">🐱</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    typingDiv.innerHTML = typingContent;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate MEWO response
function generateMEWOResponse(userMessage) {
    // Count words in user message
    const words = userMessage.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Generate MEWO response - exactly match the word count
    let mewoResponse;
    
    if (wordCount === 0) {
        mewoResponse = 'MEWO!';
    } else {
        // Create exactly the same number of MEWOs as words
        mewoResponse = 'MEWO '.repeat(wordCount).trim() + '!';
    }
    
    // Add some variety with different patterns
    const patterns = [
        mewoResponse,
        mewoResponse.replace(/!$/, ' 😺'),
        mewoResponse.replace(/!$/, ' 🐱'),
        mewoResponse.replace(/!$/, ' 😸'),
        mewoResponse.replace(/!$/, ' 🐾'),
        mewoResponse.replace(/!$/, ' 🎾'),
        mewoResponse.replace(/!$/, ' 🧶')
    ];
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    addMessage(randomPattern, 'bot');
}