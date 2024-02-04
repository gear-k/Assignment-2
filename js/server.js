// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for your frontend origin
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Replace with your frontend's origin
}));

// Proxy endpoint for login
app.post('/login', async (req, res) => {
    try {
        const response = await fetch('https://signup-828c.restdb.io/rest/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '65be5892c1ff3a2d670fe5a0' // Replace with your actual API key
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
