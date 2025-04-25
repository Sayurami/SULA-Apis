const cheerio = require("cheerio")
const axios = require("axios")


    async function tempnumber(){
    const url = 'https://receive-smss.com/'
    const response = await axios.get(url);  
    const $ = cheerio.load(response.data);
       
        const result = [];
        $("div.number-boxes > div").each((c, d) => {      
           const country = $(d).find("div.number-boxes-item-country.number-boxess-item-country").text().trim()
           const number = $(d).find("div.number-boxes-itemm-number").text()
           const link0 = $(d).find("a").attr("href")
           const link = `https://receive-smss.com${link0}`
           result.push({country,number,link})
        })
  return result
 
}



async function tempnumbercode(query){
    const url = `https://receive-smss.com/sms/${query}`;
    const response = await axios.get(url);  
    const $ = cheerio.load(response.data);
       
       const name = $("div.header-back-container > div > div > div > div > h3").text().trim()
       const number = $("span > div > a").text()
       const image = $("div > img").attr("src")

    const data = {
        Name: name,
        Number: number,
        image: image
    }


    
        const result = [];
        $("div > div.row.message_details").each((c, d) => {      
           const message = $(d).find("div.col-md-6.msgg > span").text()
           const sender = $(d).find("div.col-md-3.senderr > a").text()
           const time = $(d).find("div.col-md-3.time").text().replace(/Time/g,'')
           result.push({message,sender,time})
        })
      const results = {
          info: data,
          code: result
      }
    return results
}



module.exports = { tempnumber, tempnumbercode }
