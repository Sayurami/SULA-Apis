const cheerio = require("cheerio")
const axios = require("axios")

async function tiktokdl(link) {
  const url = 'https://tiktokdownload.online/abc?url=dl';
  const headers = {
      'User-Agent': 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.585 Mobile Safari/534.11+',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://tiktokdownload.online/id',
      'Origin': 'https://tiktokdownload.online',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'hx-current-url': 'https://tiktokdownload.online/id',
      'hx-request': true,
      'hx-target': 'target',
      'hx-trigger': '_gcaptcha_pt',
  };
  const jar = axios.default.create({
      withCredentials: true,
  });
  try {
      const res1 = await jar.get('https://tiktokdownload.online/id', {
          headers,
      });
      const token = /tt:'(.*?)'/.exec(res1.data);
      const linkna = encodeURIComponent(`id=${link}`);
      const data = `id=${linkna}&locale=id&tt=${token}`;
      const res2 = await jar.post(url, data, {
          headers,
      });
      const $ = cheerio.load(res2.data);
      const resultOverlay = $('div.result_overlay');
      const title = resultOverlay.find('h2')
          .text()
          .trim();
      const caption = resultOverlay.find('.maintext')
          .text()
          .trim();
      const nowm = resultOverlay.find('a.download_link.without_watermark')
          .attr('href');;
      const mp3 = resultOverlay.find('a.download_link.music')
          .attr('href');
     const thumbnail = $('#mainpicture > div > div:nth-child(1) > div.pure-u-6-24 > img')
          .attr('src');
      return {
          title,
          caption,
          nowm,
          mp3,
        thumbnail
      };
  }
  catch (error) {
      //awalnya throw skrng console.log
      console.log(error);
  }
}


module.exports = { tiktokdl }
