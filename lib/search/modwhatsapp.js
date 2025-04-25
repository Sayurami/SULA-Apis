const axios = require('axios')
const cheerio = require('cheerio')

async function modwhatsapp(q) {
  try {
    	const url = `https://apkdon.net/?s=${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("article").each((c, d) => {

        results.push({
             
         link: $(d).find("h2 > a").attr("href"),
         title: $(d).find("h2.entry-title").text()
          

         
        })
    })

    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

module.exports = { modwhatsapp }
