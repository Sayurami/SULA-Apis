const cheerio = require("cheerio")
const axios = require("axios")
const CREATOR = '@SULA'


async function modwhatsappdl(url) {
        try {
//const url = 'https://apkdon.net/nswhatsapp-4/'
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const title = $("h1.entry-title").text()
   const version = $("div.kb-row-layout-wrap.kb-row-layout-id561_470ee8-ae.alignnone.wp-block-kadence-rowlayout > div > div > div > div > a > span.kt-btn-inner-text").text()
   const date = $("time.entry-date.published.updated").text()

const results = {        
title: title,
version: version,
date: date
}

//return results
            
 const response1 = await axios.get(url);  
 const $1 = cheerio.load(response1.data);
 const data = [];
 $1("div.kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap").each((c, d) => {
 const link = $1(d).find("a").attr("href")
 const title1 = $1(d).find("span.kt-btn-inner-text").text()         
        if (title1 && link) {
                data.push({ title1, link });
            }
        });

                

const result = {        
Search: results,
dlsearch: data
}

return result
                              
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}


async function modwadl(url) {
        try {
const response2 = await axios.get(url);  
 const $2 = cheerio.load(response2.data);
   
 
 const result = [];
 $2("div.kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap").each((c, d) => {
const dllink = $2(d).find("a").attr("href")
const dltitle = $2(d).find("span.kt-btn-inner-text").text()
if (dltitle && dllink) {
                result.push({ dltitle, dllink });
            }
        });


return result
                

    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}

module.exports = { modwhatsappdl, modwadl }
