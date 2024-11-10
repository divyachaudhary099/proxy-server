const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const NEWS_API_KEY = 'YOUR_API_KEY';  
app.use(cors());

app.get('/api/news', async (req, res) => {
    const { country = 'us', q = '', pageSize = 10 } = req.query;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&q=${q}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
