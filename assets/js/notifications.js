/**
 * EMEA Web Demo - Notification System
 * Handles custom notification display and management
 */

// Custom notification functions
function showNotification(title, message, type = 'success', duration = 4000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    
    notification.innerHTML = 
        '<div class="notification-header">' +
            '<div class="notification-title">' + title + '</div>' +
            '<button class="notification-close" onclick="closeNotification(this)">&times;</button>' +
        '</div>' +
        '<div class="notification-message">' + message + '</div>';
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification.querySelector('.notification-close'));
        }, duration);
    }
}

function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 400);
}
