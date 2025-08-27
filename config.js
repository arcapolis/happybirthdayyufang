// ============================================
// 🎂 CUSTOMIZE YOUR BIRTHDAY WEBSITE HERE 🎂
// ============================================

const CONFIG = {
    // The birthday person's name
    birthdayName: "Yufang",

    // The title that appears in the browser tab
    // You can use emojis! 🎂 🎉 🎁 🥳 🎈
    pageTitle: "Happy Birthday Yufang! 🎂",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        birthday: ['🎂', '🎉', '🎁', '🥳', '🎈', '🍰', '🎊'],  // Birthday emojis
        extras: ['🌟', '✨', '💝']                              // Extra sparkly emojis
    },

    // Page content
    pages: {
        welcome: {
            title: "Happy Birthday!",
            subtitle: "Hope your special day is amazing! 🎉",
            nextBtn: "Continue 🎂"
        },
        message: {
            title: "A Special Message for You",
            text: "Wishing you the most wonderful birthday filled with joy, laughter, and all your favorite things! You deserve all the happiness in the world. 💝",
            nextBtn: "What's Next? 🎁"
        },
        choices: {
            title: "Choose Your Birthday Adventure!",
            subtitle: "Pick what sounds most amazing to you:",
            options: [
                {
                    id: "spa",
                    title: "Relaxing Spa Day",
                    description: "Pamper yourself with a peaceful day of relaxation 🧘‍♀️✨",
                    emoji: "🛁"
                },
                {
                    id: "dinner",
                    title: "Fancy Dinner",
                    description: "Enjoy an elegant dining experience at your favorite restaurant 🍽️🥂",
                    emoji: "🍾"
                },
                {
                    id: "golf",
                    title: "Mystery Mini Golf",
                    description: "Have a fun adventure with exciting mini golf challenges ⛳🎯",
                    emoji: "⛳"
                }
            ]
        }
    },

    // Messages that appear after they make a choice
    responses: {
        spa: {
            title: "Perfect Choice! 🧘‍♀️",
            message: "A relaxing spa day it is! Time to unwind and treat yourself like the queen you are! 👑✨",
            emojis: "🛁💆‍♀️🕯️💝🌸"
        },
        dinner: {
            title: "Excellent Choice! 🍽️",
            message: "A fancy dinner sounds amazing! Get ready for a delicious evening of great food and even better company! 🥂",
            emojis: "🍾🍽️🌹💝🎉"
        },
        golf: {
            title: "Adventure Time! ⛳",
            message: "Mystery mini golf it is! Get ready for a fun-filled adventure with surprises around every corner! 🎯",
            emojis: "⛳🎯🎊💝🏆"
        }
    },

    // Color scheme for the website
    // Birthday-themed colors - feel free to customize!
    colors: {
        backgroundStart: "#FFE5F1",      // Soft pink
        backgroundEnd: "#FFD3E8",        // Light pink
        buttonBackground: "#FF69B4",     // Hot pink
        buttonHover: "#FF1493",          // Deep pink
        textColor: "#8B008B",            // Dark magenta
        accentColor: "#FFB6C1"           // Light pink accent
    },

    // Animation settings
    animations: {
        floatDuration: "12s",            // How long it takes emojis to float up
        floatDistance: "40px",           // How far emojis move sideways
        bounceSpeed: "0.6s",             // Speed of bouncing animations
        celebrationSize: 1.8             // Size of celebration effect
    },

    // Background Music (Optional)
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Birthday Music",
        stopText: "🔇 Stop Music",
        volume: 0.4
    }
};

// Don't modify anything below this line unless you know what you're doing
window.BIRTHDAY_CONFIG = CONFIG;
