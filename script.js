// Initialize configuration
const config = window.BIRTHDAY_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.birthdayName) {
        warnings.push("Birthday name is not set! Using default.");
        config.birthdayName = "Birthday Person";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#FFE5F1",
        backgroundEnd: "#FFD3E8", 
        buttonBackground: "#FF69B4",
        buttonHover: "#FF1493",
        textColor: "#8B008B",
        accentColor: "#FFB6C1"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Current page tracker
let currentPage = 'welcome';

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Initialize first page
    showWelcomePage();

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();

    // Apply custom colors
    applyCustomColors();
});

// Show welcome page
function showWelcomePage() {
    const container = document.getElementById('content');
    container.innerHTML = `
        <div class="page-section" id="welcomePage">
            <h1 class="main-title">${config.pages.welcome.title}</h1>
            <h2 class="birthday-name">${config.birthdayName}!</h2>
            <p class="subtitle">${config.pages.welcome.subtitle}</p>
            <button onclick="showMessagePage()" class="main-btn">
                ${config.pages.welcome.nextBtn}
            </button>
        </div>
    `;
    currentPage = 'welcome';
}

// Show message page
function showMessagePage() {
    const container = document.getElementById('content');
    container.innerHTML = `
        <div class="page-section" id="messagePage">
            <h1 class="page-title">${config.pages.message.title}</h1>
            <div class="message-box">
                <p class="birthday-message">${config.pages.message.text}</p>
            </div>
            <button onclick="showChoicesPage()" class="main-btn">
                ${config.pages.message.nextBtn}
            </button>
        </div>
    `;
    currentPage = 'message';
    
    // Add some extra floating elements for the message page
    createExtraFloatingElements();
}

// Show choices page
function showChoicesPage() {
    const container = document.getElementById('content');
    const optionsHTML = config.pages.choices.options.map(option => `
        <div class="choice-option" onclick="makeChoice('${option.id}')">
            <div class="choice-emoji">${option.emoji}</div>
            <h3 class="choice-title">${option.title}</h3>
            <p class="choice-description">${option.description}</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="page-section" id="choicesPage">
            <h1 class="page-title">${config.pages.choices.title}</h1>
            <p class="subtitle">${config.pages.choices.subtitle}</p>
            <div class="choices-container">
                ${optionsHTML}
            </div>
        </div>
    `;
    currentPage = 'choices';
}

// Handle choice selection
function makeChoice(choiceId) {
    const choice = config.responses[choiceId];
    if (!choice) return;

    const container = document.getElementById('content');
    container.innerHTML = `
        <div class="page-section celebration" id="celebrationPage">
            <h1 class="celebration-title">${choice.title}</h1>
            <div class="celebration-message">
                <p>${choice.message}</p>
            </div>
            <div class="celebration-emojis">${choice.emojis}</div>
            <button onclick="showWelcomePage()" class="main-btn">
                Start Over 🔄
            </button>
        </div>
    `;
    currentPage = 'celebration';
    
    // Create celebration effect
    createCelebrationEffect();
}

// Create floating birthday elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    // Clear existing elements
    container.innerHTML = '';

    // Create birthday emojis
    config.floatingEmojis.birthday.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'floating-emoji birthday-emoji';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create extra sparkly emojis
    config.floatingEmojis.extras.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'floating-emoji extra-emoji';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Create extra floating elements for special moments
function createExtraFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Add some extra birthday emojis for the message page
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.className = 'floating-emoji birthday-emoji';
        const randomEmoji = config.floatingEmojis.birthday[Math.floor(Math.random() * config.floatingEmojis.birthday.length)];
        div.innerHTML = randomEmoji;
        setRandomPosition(div);
        container.appendChild(div);
    }
}

// Create celebration effect
function createCelebrationEffect() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Create burst of emojis
    for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.className = 'floating-emoji celebration-emoji';
        const allEmojis = [...config.floatingEmojis.birthday, ...config.floatingEmojis.extras];
        const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        div.innerHTML = randomEmoji;
        setRandomPosition(div);
        
        // Make celebration emojis more energetic
        div.style.animationDuration = '3s';
        div.style.transform = `scale(${config.animations.celebrationSize})`;
        
        container.appendChild(div);
    }
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (10 + Math.random() * 20) + 's';
}

// Apply custom colors from config
function applyCustomColors() {
    const root = document.documentElement;
    root.style.setProperty('--bg-start', config.colors.backgroundStart);
    root.style.setProperty('--bg-end', config.colors.backgroundEnd);
    root.style.setProperty('--btn-bg', config.colors.buttonBackground);
    root.style.setProperty('--btn-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);
    root.style.setProperty('--accent-color', config.colors.accentColor);
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        if (musicControls) musicControls.style.display = 'none';
        return;
    }

    if (!musicSource || !bgMusic || !musicToggle) return;

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.4;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
