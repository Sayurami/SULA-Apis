const axios = require('axios');

// 🔁 Reusable: Get video info and key from URL
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

    const data = response.data?.data;
    return {
      key: data?.key || null,
      name: data?.title || '',
      thumbnail: data?.thumbnail || '',
      duration: data?.duration || '',
    };
  } catch (err) {
    console.error('🔴 Error getting key:', err.message);
    return null;
  }
}

// 🔁 Reusable: Get download URL from key, type, and quality
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
    console.error('🔴 Error getting download URL:', err.message);
    return null;
  }
}

// 🎵 ytmp3: Download audio (128kbps)
async function ytmp3(url) {
  try {
    const videoInfo = await getDownloadKey(url);
    if (!videoInfo?.key) throw new Error('Key not found for audio.');

    const dl_link = await getDownloadUrl({ key: videoInfo.key, type: 'audio', quality: '128' });

    return {
      name: videoInfo.name,
      thumbnail: videoInfo.thumbnail,
      duration: videoInfo.duration,
      dl_link,
    };
  } catch (err) {
    console.error('ytmp3 error:', err.message);
    throw err;
  }
}

// 📹 ytmp4: Download video in multiple qualities
async function ytmp4(url) {
  try {
    const videoInfo = await getDownloadKey(url);
    if (!videoInfo?.key) throw new Error('Key not found for video.');

    const qualities = ['240', '360', '480', '720', '1080'];
    const downloadPromises = qualities.map((q) =>
      getDownloadUrl({ key: videoInfo.key, type: 'video', quality: q })
    );
    const [dl240, dl360, dl480, dl720, dl1080] = await Promise.all(downloadPromises);

    return {
      name: videoInfo.name,
      thumbnail: videoInfo.thumbnail,
      duration: videoInfo.duration,
      dl240,
      dl360,
      dl480,
      dl720,
      dl1080,
    };
  } catch (err) {
    console.error('ytmp4 error:', err.message);
    throw err;
  }
}

module.exports = { ytmp3, ytmp4 };
