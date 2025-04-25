const cheerio = require("cheerio")
const axios = require("axios")

async function appletone(query) {
  try {
    const url = `https://www.prokerala.com/downloads/ringtones/search/?q=${query}&mode=search`
    const response = await axios.get(url);  
const $ = cheerio.load(response.data);
      const appletone = []
    
    $("ul > li.list-item-outer").each((i, el) => {
        
        const title = $(el).find("div.list-item-body > div > a").text()
        const link0 = $(el).find("div.list-item-body > div > a").attr("href")
        const link = `https://dl.prokerala.com${link0}`
        appletone.push({title, link})
    })

    const result = { 
        data: appletone
    }

return result
   
  } catch (error) {
      //awalnya throw skrng console.log
      console.log(error);
  }
}



async function appletonedl(url) {
try {
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const title = $("header > h1").text()
    const dllink = $("#download-options > a").attr("href")
    const duration = $("span.player-total-duration").text()


  
      return {
          title: title,
          dllink: dllink,
          duration: duration
      };
  }
  catch (error) {
      //awalnya throw skrng console.log
      console.log(error);
  }
}


module.exports = { appletone, appletonedl }
