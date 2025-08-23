const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// N8N webhook URL
const N8N_WEBHOOK_URL = 'https://n8n.bn-prototypes.de/webhook-test/89ce9ffd-4f16-4f59-9476-f42b8164685f';

// Proxy endpoint for n8n webhook
app.post('/api/trigger-webhook', async (req, res) => {
    try {
        const response = await axios.post(N8N_WEBHOOK_URL, {
            timestamp: new Date().toISOString(),
            source: 'web-interface',
            message: 'Hello from web interface!',
            ...req.body
        });
        
        res.json({
            success: true,
            message: 'Webhook triggered successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error triggering webhook:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to trigger webhook',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Webhook URL: ${N8N_WEBHOOK_URL}`);
});