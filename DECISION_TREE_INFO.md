# POC Motion Decision Tree

## Overview
Interactive decision tree to help determine the appropriate POC (Proof of Concept) motion for OneSignal customers based on their requirements and readiness.

## Access Points

### 1. Modal Version (Embedded)
- **URL**: `index.html` (main demo page)
- **Access**: Click "Start POC Decision Tree" button in hero section
- **Format**: Modal overlay on main demo page

### 2. Standalone Page
- **URL**: `decision-tree.html`
- **Access**: Direct link or "Open in Full Page" button
- **Format**: Dedicated full-page experience

## Decision Flow

1. **Clear Use Case** → If NO: Guided Trial (end)
2. **Developer Resources** → If NO: Guided Trial (end)
3. **Technical Validation (Coffee Analogy)**:
   - Option A (Basic): Sandbox Trial (end)
   - Option B (Quality): Technical Validation POC Tier 3 (end)  
   - Option C (Complex): Continue to Step 4
4. **Competitors Involved** → Store competitive context, continue to Step 5
5. **Buying Committee Complexity** → Compute final result based on matrix logic

## Result Types

- **Sandbox Trial** - Basic functionality validation
- **Technical Validation POC (Tier 3)** - Capability comparison and improvement validation
- **Competitive Bake-Off (Tier 4)** - Head-to-head competitive evaluation
- **Proof of Value (Tier 5)** - Executive-sponsored strategic validation

## Files Structure

```
├── decision-tree.html          # Standalone decision tree page
├── index.html                  # Main demo page (includes modal version)
├── assets/
│   ├── css/
│   │   └── decision-tree.css   # Decision tree styles
│   └── js/
│       └── decision-tree.js    # Decision tree logic and state management
```

## Features

- ✅ Mobile responsive design
- ✅ Progress indicator (Step X of 5)
- ✅ Back/forward navigation
- ✅ Smooth animations and transitions
- ✅ Analytics logging (localStorage)
- ✅ Keyboard support (ESC to close)
- ✅ Custom scrollbars and proper scrolling
- ✅ State management with complex branching logic

## Usage Analytics

The decision tree automatically logs:
- User responses and flow paths
- Final recommendations
- Timestamp and user agent
- Page access method (modal vs standalone)

Logs are stored in localStorage under:
- `pocDecisionTreeLogs` (modal usage)
- `standaloneDecisionTreeLogs` (standalone page usage)
