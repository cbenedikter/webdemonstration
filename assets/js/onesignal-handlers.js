/**
 * EMEA Web Demo - OneSignal Integration Handlers
 * Contains all OneSignal-specific functionality for login, logout, tags, etc.
 */

// Login popup functions
function showLoginPopup() {
    const popup = document.getElementById('login-popup');
    popup.style.display = 'flex';
    document.getElementById('username-input').focus();
}

function closeLoginPopup() {
    const popup = document.getElementById('login-popup');
    popup.style.display = 'none';
    document.getElementById('username-input').value = '';
}

function performLogin() {
    const username = document.getElementById('username-input').value.trim();
    
    if (!username) {
        showNotification('Error', 'Please enter a username', 'error', 3000);
        return;
    }

    // Call OneSignal login with the username as external_id
    OneSignalDeferred.push(async function(OneSignal) {
        try {
            await OneSignal.login(username);
            console.log('Successfully logged in with external_id: ' + username);
            showNotification('Login Successful', 'Successfully logged in as: ' + username, 'success');
            closeLoginPopup();
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Login Failed', 'Login failed. Please try again.', 'error');
        }
    });
}

// Logout popup functions
function showLogoutPopup() {
    const popup = document.getElementById('logout-popup');
    popup.style.display = 'flex';
}

function closeLogoutPopup() {
    const popup = document.getElementById('logout-popup');
    popup.style.display = 'none';
}

function performLogout() {
    // Call OneSignal logout
    OneSignalDeferred.push(async function(OneSignal) {
        try {
            await OneSignal.logout();
            console.log('Successfully logged out');
            showNotification('Logout Successful', 'You have been successfully logged out', 'success');
            closeLogoutPopup();
        } catch (error) {
            console.error('Logout error:', error);
            showNotification('Logout Failed', 'Logout failed. Please try again.', 'error');
        }
    });
}

// Modify Tags popup functions
function showAddTagPopup() {
    const popup = document.getElementById('add-tag-popup');
    popup.style.display = 'flex';
    document.getElementById('tag-key-input').focus();
}

function closeAddTagPopup() {
    const popup = document.getElementById('add-tag-popup');
    popup.style.display = 'none';
    document.getElementById('tag-key-input').value = '';
    document.getElementById('tag-value-input').value = '';
}

function performAddTag() {
    const tagKey = document.getElementById('tag-key-input').value.trim();
    const tagValue = document.getElementById('tag-value-input').value.trim();
    
    if (!tagKey) {
        showNotification('Error', 'Please enter a tag key', 'error', 3000);
        return;
    }

    // Call OneSignal based on whether we're adding or removing
    OneSignalDeferred.push(async function(OneSignal) {
        try {
            if (tagValue) {
                // Adding a tag
                await OneSignal.User.addTag(tagKey, tagValue);
                console.log('Successfully added tag: ' + tagKey + ' = ' + tagValue);
                showNotification('Tag Added', 'Successfully added tag: ' + tagKey + ' = ' + tagValue, 'success');
            } else {
                // Removing a tag
                await OneSignal.User.removeTag(tagKey);
                console.log('Successfully removed tag: ' + tagKey);
                showNotification('Tag Removed', 'Successfully removed tag: ' + tagKey, 'success');
            }
            closeAddTagPopup();
        } catch (error) {
            console.error('Tag modification error:', error);
            const action = tagValue ? 'add' : 'remove';
            showNotification('Tag Modification Failed', 'Failed to ' + action + ' tag. Please try again.', 'error');
        }
    });
}

// View Tags popup functions
function showViewTagsPopup() {
    const popup = document.getElementById('view-tags-popup');
    popup.style.display = 'flex';
    loadUserTags();
}

function closeViewTagsPopup() {
    const popup = document.getElementById('view-tags-popup');
    popup.style.display = 'none';
}

function loadUserTags() {
    const tagsContainer = document.getElementById('tags-container');
    
    // Call OneSignal to get user tags
    OneSignalDeferred.push(async function(OneSignal) {
        try {
            const tags = OneSignal.User.getTags();
            console.log('User tags:', tags);
            
            if (tags && Object.keys(tags).length > 0) {
                // Display tags
                let tagsHTML = '';
                for (const [key, value] of Object.entries(tags)) {
                    tagsHTML += '<div class="tag-item">' +
                        '<span class="tag-key">' + key + '</span>' +
                        '<span class="tag-value">' + value + '</span>' +
                        '</div>';
                }
                tagsContainer.innerHTML = tagsHTML;
            } else {
                // No tags found
                tagsContainer.innerHTML = '<div class="no-tags">No tags found on your profile.</div>';
            }
        } catch (error) {
            console.error('Error loading tags:', error);
            tagsContainer.innerHTML = '<div class="no-tags">Error loading tags. Please try again.</div>';
        }
    });
}
