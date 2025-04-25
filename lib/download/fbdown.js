const cheerio = require("cheerio")
const axios = require("axios")

async function fbdown(url) {
 return new Promise(async (resolve, reject) => {
let params = new URLSearchParams()
params.append('URLz', url)
let res = await fetch('https://fdown.net/download.php', 
{ 
method: 'POST',
headers:{
"Origin":"https://fdown.net",
"Referer":"https://fdown.net/",
},
body: params })
let html = await res.text()
let $ = cheerio.load(html)
const thumb = $("#result > div.col-xs-6.col-xs-offset-3.no-padding.lib-item > div > div > div:nth-child(1) > img").attr("src")
const title = $("#result > div.col-xs-6.col-xs-offset-3.no-padding.lib-item > div > div > div:nth-child(2) > div.lib-row.lib-header").text().trim()
const desc = $("#result > div.col-xs-6.col-xs-offset-3.no-padding.lib-item > div > div > div:nth-child(2) > div:nth-child(2)").text().trim().split(":")[1]
const sd = $("#sdlink").attr("href")
const hd = $("#hdlink").attr("href")
if(!hd) resolve({thumb, title, desc, sd})
else resolve({thumb, title, desc, sd, hd})
})}

function fbreg(url) {
  const fbRegex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
  return fbRegex.test(url);
}
module.exports = {fbdown}
