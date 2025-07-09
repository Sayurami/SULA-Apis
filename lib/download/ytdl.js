const axios = require('axios');

// Reusable: get the download key
async function getDownloadKey(url) {
  try {
    const response = await axios.post(
      'https://cdn59.savetube.su/info',
      { url },
      {
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://yt.savetube.me',
          'Referer': 'https://yt.savetube.me/',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        },
      }
    );
    return response.data?.data?.key || null;
  } catch (err) {
    console.error('Error getting key:', err.message);
    return null;
  }
}

// Reusable: get download URL from key
async function getDownloadUrl({ key, type, quality }) {
  try {
    const response = await axios.post(
      'https://cdn61.savetube.su/download',
      { key, downloadType: type, quality },
      {
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://yt.savetube.me',
          'Referer': 'https://yt.savetube.me/',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        },
      }
    );
    return response.data?.data?.downloadUrl || null;
  } catch (err) {
    console.error('Error getting download URL:', err.message);
    return null;
  }
}

// 🟡 ytmp3: Get 128kbps audio
async function ytmp3(url) {
  try {
    const key = await getDownloadKey(url);
    if (!key) throw new Error('Key not found for audio.');

    const dl_link = await getDownloadUrl({ key, type: 'audio', quality: '128' });

    return { dl_link };
  } catch (err) {
    console.error('ytmp3 error:', err.message);
    throw err;
  }
}

// 🟢 ytmp4: Get multiple video qualities
async function ytmp4(url) {
  try {
    const key = await getDownloadKey(url);
    if (!key) throw new Error('Key not found for video.');

    const [dl, dl1, dl2, dl3, dl4] = await Promise.all([
      getDownloadUrl({ key, type: 'video', quality: '240' }),
      getDownloadUrl({ key, type: 'video', quality: '360' }),
      getDownloadUrl({ key, type: 'video', quality: '480' }),
      getDownloadUrl({ key, type: 'video', quality: '720' }),
      getDownloadUrl({ key, type: 'video', quality: '1080' }),
    ]);

    return { dl, dl1, dl2, dl3, dl4 };
  } catch (err) {
    console.error('ytmp4 error:', err.message);
    throw err;
  }
}

module.exports = { ytmp3, ytmp4 };
