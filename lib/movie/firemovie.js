const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 8000;

// Your searchMovies function
async function firemovie(query) {
    const searchUrl = `https://firemovieshub.com/?s=${query}`;
    try {
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);
        const searchResults = [];

        $('.result-item').each((i, elem) => {
            const title = $(elem).find('.title a').text().trim();
            const link = $(elem).find('.title a').attr('href');
            const img = $(elem).find('img').attr('src') || 'https://via.placeholder.com/100x150?text=No+Image';

            searchResults.push({ title, link, img });
        });

        if (searchResults.length === 0) {
            return { error: 'No movies found for this query.' };
        }

        return { searchResults };
    } catch (error) {
        console.error('Error searching movies:', error);
        return { error: 'Failed to fetch search results.' };
    }
}

// API Endpoint for Movie Search
app.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }

    const result = await firemovie(query);
    if (result.error) {
        return res.status(500).json(result);
    }

    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { firemovie }
