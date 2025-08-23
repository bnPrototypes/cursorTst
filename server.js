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
        // Try different payload formats to see what n8n expects
        const payload = {
            // Simple string payload (most common for n8n)
            message: 'Hello from web interface!',
            
            // Or try with just the action
            action: req.body.action || 'hello',
            
            // Or try with minimal data
            data: {
                timestamp: new Date().toISOString(),
                source: 'web-interface',
                action: req.body.action || 'hello'
            }
        };

        console.log('Sending payload to n8n:', payload);
        
        const response = await axios.post(N8N_WEBHOOK_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'WebHook-Interface/1.0'
            }
        });
        
        console.log('N8N Response:', response.data);
        
        res.json({
            success: true,
            message: 'Webhook triggered successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error triggering webhook:', error.message);
        console.error('Error details:', error.response?.data);
        
        res.status(500).json({
            success: false,
            message: 'Failed to trigger webhook',
            error: error.message,
            details: error.response?.data
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test endpoint to try different payload formats
app.post('/api/test-webhook', async (req, res) => {
    const { format } = req.body;
    
    let payload;
    switch(format) {
        case 'simple':
            payload = 'Hello from web interface!';
            break;
        case 'json':
            payload = { message: 'Hello from web interface!' };
            break;
        case 'minimal':
            payload = { action: 'hello' };
            break;
        default:
            payload = 'Hello from web interface!';
    }
    
    try {
        console.log(`Testing with format: ${format}, payload:`, payload);
        
        const response = await axios.post(N8N_WEBHOOK_URL, payload, {
            headers: {
                'Content-Type': format === 'simple' ? 'text/plain' : 'application/json'
            }
        });
        
        res.json({
            success: true,
            format: format,
            payload: payload,
            response: response.data
        });
    } catch (error) {
        res.json({
            success: false,
            format: format,
            payload: payload,
            error: error.message,
            details: error.response?.data
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Webhook URL: ${N8N_WEBHOOK_URL}`);
});