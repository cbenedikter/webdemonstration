# EMEA Web Demo

A scalable web demonstration platform for showcasing various brand implementations with OneSignal integration.

## Project Structure

```
EMEA Web Demo/
├── assets/
│   ├── css/                    # Stylesheets
│   │   ├── main.css           # Core layout and styling
│   │   ├── popups.css         # Modal and popup styles
│   │   └── notifications.css   # Notification system styles
│   ├── js/                     # JavaScript modules
│   │   ├── main.js            # Core application logic
│   │   ├── notifications.js   # Notification system
│   │   └── onesignal-handlers.js # OneSignal integration
│   └── images/                 # Static assets
│       └── icon_with_25_percent_margin.png
├── demos/                      # Brand demonstration pages
│   └── iqos/                  # IQOS brand demo
│       └── demo.html          # IQOS checkout page
├── index.html                  # Main application
├── OneSignalSDKWorker.js      # OneSignal service worker
└── README.md                  # This file
```

## Features

### Main Application (`index.html`)
- **OneSignal Integration**: Complete SDK integration with user management
- **Interactive UI**: Modern gradient design with floating animations
- **Popup System**: Modal dialogs for login, logout, and tag management
- **Notification System**: Custom toast notifications with success/error states
- **Live Demonstrations**: Dynamic navigation to brand-specific demos

### Modular Architecture
- **Separated Concerns**: CSS, JavaScript, and HTML are properly separated
- **Scalable Structure**: Easy to add new brand demonstrations
- **Maintainable Code**: Well-organized and documented codebase

## OneSignal Features Demonstrated

1. **User Authentication**
   - Login with external ID
   - Logout functionality

2. **Tag Management**
   - Add user tags
   - Remove user tags
   - View existing tags

3. **Future Implementations** (Placeholders)
   - Email subscription
   - SMS subscription
   - Custom events
   - Outcome tracking

## Adding New Brand Demonstrations

To add a new brand demonstration:

1. Create a new folder in `demos/[brand-name]/`
2. Add your brand-specific HTML file (e.g., `demo.html`)
3. Update the `handleClick()` function in `assets/js/main.js` to include navigation
4. Add a new button to the main interface if needed

### Example: Adding Shell Demo

```javascript
// In assets/js/main.js, add to handleClick() switch statement:
case 'shell-demo':
    window.open('demos/shell/demo.html', '_blank');
    break;
```

## Development

### File Organization
- **CSS**: Modular stylesheets for different UI components
- **JavaScript**: Separated by functionality (main logic, notifications, OneSignal)
- **Demos**: Each brand gets its own directory for complete isolation

### Best Practices
- External stylesheets and scripts for maintainability
- Semantic HTML structure
- Responsive design with mobile-first approach
- Consistent naming conventions
- Comprehensive commenting

## Browser Support

- Modern browsers with ES6+ support
- Mobile responsive design
- OneSignal Web SDK compatibility

## Getting Started

1. Open `index.html` in a web browser
2. Interact with OneSignal features using the provided buttons
3. Click "Live Demonstration" to see the IQOS brand demo
4. Use the popup interfaces to test login, logout, and tag management

## Configuration

OneSignal App ID is configured in the main HTML file:
```javascript
await OneSignal.init({
  appId: "cf532c5e-5be2-4b00-ab6d-3d3d72ca9124",
});
```

Update this with your own OneSignal App ID for production use.
