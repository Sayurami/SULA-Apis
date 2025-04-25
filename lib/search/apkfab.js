const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require('cheerio')

async function apks1(q) {
  try {
    const url = 'https://apkfab.com/search?q=' + q; // Ganti dengan URL yang sesuai

    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);

    const results = $('.list-template.lists .list').map((index, element) => {
      return {
        title: $(element).find('.title').text().trim(),
        link: $(element).find('a').attr('href'),
        image: $(element).find('.icon img').attr('data-src'),
        rating: $(element).find('.other .rating').text().trim(),
        review: $(element).find('.other .review').text().trim(),
      };
    }).get();

    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

async function apkd1(url) {
  try {
    const response = await fetch(url.endsWith('/download') ? url : url + '/download');
    const body = await response.text();

    const $ = cheerio.load(body);

    const title = $('.download_button_box a.down_btn').attr('title');
    const link = $('.download_button_box a.down_btn').attr('href');
    const size = $('body > main > div.down-banner > div > div > div.download_button_box.click_later_hide > a > span').text().split('APK ')[1]
    return { title, link, size}
  } catch (error) {
    console.error('Error fetching download details:', error);
  }
}
module.exports = { apks1, apkd1 }
