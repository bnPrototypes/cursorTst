# N8N Webhook Interface

A simple web interface to trigger n8n webhooks with a modern Bootstrap UI.

## Features

- 🎨 Modern Bootstrap 5.3.2 UI with glassmorphism design
- 🔗 N8N webhook integration
- 📱 Responsive design
- 🔄 Real-time feedback with toast notifications
- ⚡ Loading states and error handling

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Configuration

The n8n webhook URL is configured in `server.js`:

```javascript
const N8N_WEBHOOK_URL = 'https://n8n.bn-prototypes.de/webhook-test/c3d7da87-c791-4dd0-963f-97c67884fa2a';
```

## How it Works

1. **Frontend**: Bootstrap-based UI with two buttons
2. **Backend**: Express.js server that proxies requests to n8n
3. **Webhook**: The Hello button triggers the n8n webhook with additional metadata
4. **Feedback**: Toast notifications show success/error status

## API Endpoints

- `POST /api/trigger-webhook` - Triggers the n8n webhook
- `GET /api/health` - Health check endpoint

## Files Structure

```
├── index.html          # Main web interface
├── server.js           # Express.js server
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Troubleshooting

- Make sure the n8n webhook URL is accessible
- Check the browser console for any JavaScript errors
- Verify the server is running on port 3000
- Ensure all dependencies are installed correctly