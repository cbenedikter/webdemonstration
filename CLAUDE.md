# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web demonstration platform for showcasing OneSignal Web SDK integration with support for multiple brand implementations. The project is built with vanilla HTML, CSS, and JavaScript (no build tools required).

**OneSignal App ID**: `cf532c5e-5be2-4b00-ab6d-3d3d72ca9124`

## Architecture

### Core Application Structure

The application uses a **modular, file-based architecture** with separation of concerns:

- **Main Entry Point** (`index.html`): Central playground with OneSignal integration buttons
- **Decision Tree** (`decision-tree.html`): Standalone POC decision tree tool, also available as modal in main page
- **Demo Pages** (`demos/*/`): Isolated brand-specific demonstrations with their own OneSignal integrations

### JavaScript Module Organization

All JavaScript is organized into functional modules under `assets/js/`:

1. **main.js**: Core application logic and button routing
   - `handleClick()` function is the central router for all button actions
   - Manages popup display and navigation to demo pages
   - Contains DOM initialization and animation logic

2. **onesignal-handlers.js**: OneSignal SDK operations
   - All OneSignal API calls (login, logout, tags)
   - Popup management for OneSignal features
   - User data operations

3. **notifications.js**: Toast notification system
   - `showNotification()` function for all user feedback
   - Self-contained UI notification logic

4. **decision-tree.js**: POC decision tree state machine
   - Multi-step question flow with branching logic
   - Competitive context tracking and stakeholder level analysis
   - Recommendation engine for POC motion (Tier 3-5 outcomes)

### CSS Module Organization

Stylesheets under `assets/css/` are organized by UI component:

- **main.css**: Base layout, gradients, floating animations, responsive grid
- **popups.css**: Modal/overlay styles for all popup dialogs
- **notifications.css**: Toast notification component styles
- **decision-tree.css**: Decision tree UI and progress indicators

### Demo Pages Pattern

Each demo lives in `demos/[brand-name]/` with:
- Self-contained HTML file (e.g., `demo.html`, `custom_event_demo.html`)
- OneSignal SDK initialization with same App ID
- Relative paths to shared assets (`../../assets/`)
- Can demonstrate specific OneSignal features (custom events, outcomes, etc.)

## Adding New Features

### Adding a New Brand Demo

1. Create directory: `demos/[brand-name]/`
2. Create HTML file with OneSignal SDK initialization
3. Link to shared CSS: `<link rel="stylesheet" href="../../assets/css/main.css">`
4. Add navigation in `assets/js/main.js`:
   ```javascript
   case 'new-demo':
       window.open('demos/brand-name/demo.html', '_blank');
       break;
   ```
5. Add button to `index.html` buttons-grid section

### Adding OneSignal Features

All OneSignal operations go in `assets/js/onesignal-handlers.js`:
- Use `OneSignalDeferred.push()` pattern for SDK calls
- Follow existing error handling pattern with try/catch
- Show notifications via `showNotification()` for user feedback
- Add corresponding popup in `index.html` if user input needed

## Development Commands

**No build process required** - Open files directly in browser:

```bash
# Start local server (recommended for testing)
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve

# Then open: http://localhost:8000/index.html
```

Alternatively, open `index.html` directly in browser (file:// protocol works but may have CORS limitations).

## Important Implementation Notes

### OneSignal Integration Pattern

All OneSignal SDK calls must use the deferred pattern:

```javascript
OneSignalDeferred.push(async function(OneSignal) {
    // Your OneSignal API calls here
});
```

The SDK is initialized in HTML `<head>` with:
```javascript
await OneSignal.init({ appId: "cf532c5e-5be2-4b00-ab6d-3d3d72ca9124" });
```

### Navigation and Demo Access

- **Custom Demo 1**: Opens `demos/custom_demo/demo_one.html` in new tab
- **Custom Demo 2**: Opens `demos/custom_demo/demo_two.html` in new tab
- **Add Event**: Navigates to `demos/custom-events/custom_event_demo.html` (same window)
- **POC Decision Tree**: Links to `decision-tree.html` (can also open as modal)

### Decision Tree Logic

The POC decision tree (`decision-tree.js`) implements a 5-step flow:
1. Clear use case check
2. Developer resources availability
3. Technical validation type (coffee shop analogy)
4. Competitive landscape assessment
5. Buying committee complexity analysis

Results are computed based on stakeholder level (Executive/Biz-Dev/Committee) + competitive context, yielding Tier 3-5 POC motions. Usage analytics are stored in localStorage under `pocDecisionTreeLogs` and `standaloneDecisionTreeLogs`.

### State Management

- **Decision Tree**: Uses `decisionTreeState` object for step tracking and response storage
- **OneSignal User State**: Managed by OneSignal SDK (tags, external_id)
- **No global state management library** - all state is local to modules

## File Locations Reference

- Main app: `index.html`
- OneSignal handlers: `assets/js/onesignal-handlers.js`
- Decision tree: `decision-tree.html` + `assets/js/decision-tree.js`
- Custom events demo: `demos/custom-events/custom_event_demo.html`
- Custom demos: `demos/custom_demo/demo_one.html`, `demos/custom_demo/demo_two.html`
