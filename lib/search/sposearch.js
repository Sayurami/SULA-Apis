const axios = require('axios');

// Replace these with your Spotify API credentials
const clientId = '0770a58ad3aa482c80602ee21a41df9d';
const clientSecret = 'f8b11f7a139f4abb89743c36ebebea4e';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// Function to authenticate with Spotify and get an access token
async function getAccessToken() {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authString}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Function to search for a song on Spotify
async function searchSong(songName, accessToken) {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`;

  const response = await fetch(searchEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.tracks.items.map(track => ({
    title: track.name,
    duration: track.duration_ms,
    popularity: `${track.popularity}%`,
    preview: track.preview_url,
    artist: track.artists.map(artist => artist.name).join(', '),
    url: track.external_urls.spotify,
  }));
}
module.exports = { getAccessToken, searchSong }
