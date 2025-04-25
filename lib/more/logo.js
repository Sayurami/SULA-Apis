const axios = require("axios")
const cheerio = require("cheerio")
require("dotenv").config()
const CREATOR = 'UDMODZ'
  
async function logo() {
    try {
const url = 'https://en.ephoto360.com/text-effects-c6';
const response = await axios.get(url);	
const $ = cheerio.load(response.data);	
	let page1 = [];
    $("div > div.col-md-4").each((c, d) => {       
            const title = $(d).find("a > div.title-effect-home").text()
            const link = $(d).find("a").attr("href")
    if (title && link) {
                page1.push({ title: title, link: `https://en.ephoto360.com${link}` });
            }
    });
	//return page1    
	    
    
const url1 = 'https://en.ephoto360.com/text-effects-c6-p2';
const response1 = await axios.get(url1);	
const $1 = cheerio.load(response1.data);	
         let page2 = [];
    $1("div > div.col-md-4").each((c, d) => {        
            const title = $1(d).find("a > div.title-effect-home").text()
            const link = $1(d).find("a").attr("href")
    if (title && link) {
                page2.push({ title: title, link: `https://en.ephoto360.com${link}` });
            }    
    });
//return page2


const url2 = 'https://en.ephoto360.com/text-effects-c6-p3';
const response2 = await axios.get(url2);	
const $2 = cheerio.load(response2.data);	
    let page3 = [];
    $2("div > div.col-md-4").each((c, d) => {        
            const title = $2(d).find("a > div.title-effect-home").text()
            const link = $2(d).find("a").attr("href")
    if (title && link) {
                page3.push({ title: title, link: `https://en.ephoto360.com${link}` });
            }     
    });

const url3 = 'https://en.ephoto360.com/text-effects-c6-p4';
const response3 = await axios.get(url3);	
const $3 = cheerio.load(response3.data);	
    let page4 = [];
    $3("div > div.col-md-4").each((c, d) => {        
            const title = $3(d).find("a > div.title-effect-home").text()
            const link = $3(d).find("a").attr("href")
    if (title && link) {
                page4.push({ title: title, link: `https://en.ephoto360.com${link}` });
            }     
    });

const url4 = 'https://en.ephoto360.com/text-effects-c6-p5';
const response4 = await axios.get(url4);	
const $4 = cheerio.load(response4.data);	
    let page5 = [];
    $4("div > div.col-md-4").each((c, d) => {        
            const title = $4(d).find("a > div.title-effect-home").text()
            const link = $4(d).find("a").attr("href")
    if (title && link) {
                page5.push({ title: title, link: `https://en.ephoto360.com${link}` });
            }     
    });	    
	    
const result = {
data: {	
page1: page1,
page2: page2,
page3: page3,
page4: page4,	
page5: page5
}
}
    

return result

	    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
        console.log(errors)
    }
}

//=============================================================

module.exports = { logo }
