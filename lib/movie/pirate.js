const axios = require("axios")
const nexara = require("@dark-yasiya/nexara")
const cheerio = require("cheerio")

async function pirate_search(query) {
try {
const $ = await nexara("https://pirate.lk/?s="+query)
const movies = []

$("#contenedor > div.module > div.content.rigth.csearch > div > div > article").each((i, el) => {
    const imdb = $(el).find("div.details > div.meta > span.rating").text().toUpperCase()
    const year = $(el).find("div.details > div.meta > span.year").text()
    const title = $(el).find("div.details > div.title > a").text()
    const link = $(el).find("div.details > div.title > a").attr("href")
    const image = $(el).find("div.image > div > a > img").attr("src")
    const type = $(el).find("div.image > div > a > span").text().trim()
    movies.push({title,imdb, year, link, image, type})
})

const result = {
  
    data: movies
}

if (movies.length === 0) {
    console.log("No movies found with the given query.");
} else {
    //console.log("Movies found:", movies.length);
    return result
}
    
} catch (error) {
console.error("Error:", error);
throw error;
}}

//=============================================================
async function pirate_movieDl(query) {
try {
const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
if (!query || !https.test(query)) {
    console.log("Invalid URL. Please provide a valid HTTPS URL.");
    return;
}

const $ = await nexara(query);

const cast = []
$("#cast > div.persons > div.person").each((i, el) => {
    const cast_name = $(el).find("div.data > div.name > a").text()
    const cast_link = $(el).find("div.data > div.name > a").attr("href")
    cast.push({cast_name, cast_link})
})

const title = $("#single > div.content.right > div.sheader > div.data > h1").text();
const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
const country = $("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text();                                      
const runtime = $("#single > div.content.right > div.sheader > div.data > div.extra > span.runtime").text();
const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
const description = $("#info > div.wp-content > p").text().trim();
const imdb = $("#repimdb > strong").text();
const tmdb = $("#info > div.custom_fields > span > strong").text();
const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");


const downlink = [];
const downloadLinks = $("#download > div.links_table > div.fix-table > table > tbody > tr");

downloadLinks.each((index, row) => {
    const quality = $(row).find("td:nth-child(2)").text().trim();
    const size = $(row).find("td:nth-child(4)").text().trim();
    const link = $(row).find("td:nth-child(1) a").attr("href");

    if (quality && size && link) {
        downlink.push({ quality, size, link: link });
    }
});

const detailedDownlinkPromises = downlink.map(async (item) => {
    try {
        const detailPage = await axios.get(item.link);
        const $detail = cheerio.load(detailPage.data);
        const link = $detail("#link").attr("href")?.trim(); 
        return { ...item, link };
    } catch (error) {
        console.error(`Error fetching details for link ${item.link}: ${error.message}`);
        return item;
    }
});

const detailedDownlink = await Promise.all(detailedDownlinkPromises);

const result = {
        title: title,
        imdb: imdb,
        tmdb: tmdb,
        date: date,
        country: country,
        runtime: runtime,                
        image: image,
        category: category,
        description: description,
        director: director,
        cast: cast,

        dl_links: detailedDownlink
    };

return result

} catch (error) {
console.error("Error:", error);
throw error;
}}

module.exports = { pirate_search, pirate_movieDl }