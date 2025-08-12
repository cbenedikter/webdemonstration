/**
 * EMEA Web Demo - Main Application Logic
 * Handles UI interactions, button clicks, and general application behavior
 */

// Main button click handler
function handleClick(buttonText) {
    // Add a subtle animation effect
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = '';
    }, 150);

    // Handle different button actions
    switch(buttonText) {
        case 'login':
            showLoginPopup();
            break;
        case 'logout':
            showLogoutPopup();
            break;
        case 'modify-tags':
            showAddTagPopup();
            break;
        case 'view-tag':
            showViewTagsPopup();
            break;
        case 'add-email':
            // TODO: Add email functionality
            console.log('Add email clicked');
            break;
        case 'add-sms':
            // TODO: Add SMS functionality
            console.log('Add SMS clicked');
            break;
        case 'add-event':
            // TODO: Add event functionality
            console.log('Add event clicked');
            break;
        case 'send-outcome':
            // TODO: Add send outcome functionality
            console.log('Send outcome clicked');
            break;
        case 'live-demo':
            // Open the live demonstration page
            window.open('demos/iqos/demo.html', '_blank');
            break;
        default:
            console.log('Button clicked: ' + buttonText);
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize popup event listeners
    initializePopupEventListeners();
    
    // Initialize keyboard event listeners
    initializeKeyboardEventListeners();
    
    // Add button load animations
    initializeButtonAnimations();
});

// Initialize popup click-outside-to-close functionality
function initializePopupEventListeners() {
    // Close popup when clicking outside
    document.getElementById('login-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLoginPopup();
        }
    });

    document.getElementById('logout-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLogoutPopup();
        }
    });

    document.getElementById('add-tag-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAddTagPopup();
        }
    });

    document.getElementById('view-tags-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeViewTagsPopup();
        }
    });
}

// Initialize keyboard event listeners
function initializeKeyboardEventListeners() {
    // Handle Enter key in username input
    document.getElementById('username-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performLogin();
        }
    });

    // Handle Enter key in tag inputs
    document.getElementById('tag-key-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('tag-value-input').focus();
        }
    });

    document.getElementById('tag-value-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performAddTag();
        }
    });
}

// Initialize button load animations
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((button, index) => {
        // Add staggered animation on page load
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.6s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, index * 100);
    });
}
