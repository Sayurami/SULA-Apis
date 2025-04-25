const axios = require("axios")
const nexara = require("@dark-yasiya/nexara")
const cheerio = require("cheerio")
require("dotenv").config()
const CREATOR = "UDMODZ"




module.exports = class Sinhalasub {
    constructor() {}
  
async search(query) {
    try {

    const url = `https://sinhalasub.lk/?s=${query}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const movies = [];
  
$("div.result-item").each((c, d) => {         
      const link = $(d).find("div.title > a").attr("href")
      const title = $(d).find("div.title > a").text()  
       movies.push({title, link})
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
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
        console.log(errors)
    }
}

//────────────────
/*async movieDl(query) {
    try {
  
       const response = await axios.get(query);
		    const $ = cheerio.load(response.data);
	    
	    
	const title = $("#single > div.content.right > div.sheader > div.data > div.head > h1").text();
        const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
        const country = $("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text();                                      
        const runtime = $("#single > div.content.right > div.sheader > div.data > div.extra > span.runtime").text();
        const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
        const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
        const description = $("#info > div.wp-content > p").text().trim();

        const imdbRate = $("#repimdb > strong").text();
        const imdbVote =$("#repimdb").text().trim();
        const imdbVote2 = imdbVote.replace(imdbRate + " ", "")
        const imdbVoteCount = imdbVote2.replace(" votes", "")
        const tmdbRate = $("span.valor > strong").text();
        const sinhalasubVote = $("span.dt_rating_vgs").text()


        const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
        const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");
        const subtitle_author = $("div.profile-card-inf__title > center > strong > a").text()
        
        const pixeldrain = [];
        const downloadLinks = $("div#download.sbox > div > div > table > tbody > tr").each((c, d) => {           
        const link =$(d).find("td > a").attr("href")
        const quality = $(d).find("td > strong").text()
        const size = $(d).find("td:nth-child(3)").text()       
        pixeldrain.push({ quality, size, link });
        });


        const mega = [];
        const downloadLinks1 = $1("div#download-02.sbox > div > div > table > tbody > tr").each((c, d) => {                 
        const link = $1(d).find("td > a").attr("href")
        const quality = $1(d).find("td > strong").text()
        const size = $1(d).find("td:nth-child(3)").text()         
	mega.push({ quality, size, link });
        });

        
        const ddl = $2("div#download-03.sbox > div > div > table > tbody > tr").each((c, d) => {                   
        const link = $2(d).find("td > a").attr("href")
        const quality = $2(d).find("td > strong").text()
        const size = $2(d).find("td:nth-child(3)").text()        
        ddl.push({ quality, size, link });
        });  
    
    
const result = {
            
                title: title,
                date: date,
                country: country,
                runtime: runtime,
                imdbRate: imdbRate,
                imdbVoteCount: imdbVoteCount,
                tmdbRate: tmdbRate,
                sinhalasubVote: sinhalasubVote,
                image: image || "",
                category: category,
                subtitle_author: subtitle_author,
                description: description,
                director: director,
                images: images
        
        };

	    
    return result
    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
    }
  }  
}
    */


//================================================

async movieDl(query) {
    try {
        const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
        if (!query || !https.test(query)) {
            console.log("Invalid URL. Please provide a valid HTTPS URL.");
            console.log("මොකක්ද මනුස්සයෝ කරන්නෙ SinhalaSub.lk FILM URL එකක් දාපන්");
            return;
        }

        const $ = await nexara(query);

        const images = []
        $("div.g-item").each((i, el) => {
            const url2 = $(el).find("a").attr("href")
            const url  = url2.replace("\n" , "")
            images.push(url)
        })

        const title = $("#single > div.content.right > div.sheader > div.data > div.head > h1").text();
        const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
        const country = $("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text();                                      
        const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
        const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
        const description = $("#info > div.wp-content > p").text().trim();
        const imdbVote =$("#repimdb").text().trim();
        const tmdbRate = $("span.valor > strong").text();
        const sinhalasubVote = $("span.dt_rating_vgs").text()


        const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
        const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");
        const subtitle_author = $("div.profile-card-inf__title > center > strong > a").text()
    

const pixeldrain = [];
        const downloadLinks = $("#download > div > div > table > tbody > tr");
        downloadLinks.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");
            if (quality && size && downloadLinkOut) {
                pixeldrain.push({ quality, size, link: downloadLinkOut });
            }
        });

const ddl = [];
        const downloadLinks3 = $("#download-03 > div > div > table > tbody > tr");
        downloadLinks3.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");
            if (quality && size && downloadLinkOut) {
                ddl.push({ quality, size, link: downloadLinkOut });
            }
        });
        
const mega = [];	    
        const downloadLinks2 = $("#download-02 > div > div > table > tbody > tr");
        downloadLinks2.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");
            if (quality && size && downloadLinkOut) {
                mega.push({ quality, size, link: downloadLinkOut });
            }
        });


//────╼───╼

	    

const detailedDownlinkPromises = pixeldrain.map(
            async (item) => {
            try {
                const detailPage = await axios.get(item.link);
                const $detail = cheerio.load(detailPage.data);
                const link = $detail("#link").attr("href")?.trim().replace(/u/g, 'api/file') 
                return { ...item, link };
            } catch (error) {
                console.error(`Error fetching details for link ${item.link}: ${error.message}`);
                return item;
            }
        });
	    
const detailedDownlink = await Promise.all(detailedDownlinkPromises)
	    
const detailedDownlinkPromises1 = ddl.map(
            async (item) => {
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

        const detailedDownlink1 = await Promise.all(detailedDownlinkPromises1);

const detailedDownlinkPromises2 = mega.map(
            async (item) => {
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

        const detailedDownlink2 = await Promise.all(detailedDownlinkPromises2);

//───────────
	    
        const result = {
            data: {
                title: title,
                date: date,
                country: country,
                tmdbRate: tmdbRate,
                sinhalasubVote: sinhalasubVote,
                image: image || "",
                category: category,
                subtitle_author: subtitle_author,
                description: description,
                director: director,
                images: images,
                pixeldrain_dl: detailedDownlink,
		ddl_dl: detailedDownlink1,
		meda_dl: detailedDownlink2
			}
        };

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

//================================================

async tvshow(query) {
    try {
    const $ = await nexara(query)



    const title = $("#single > div.content.right > div.sheader > div.data > div.head > h1").text();
    const originalTitle = $("div.custom_fields:nth-child(3) > span").text()
    const date = $("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
    const categorydata = $("#single > div.content.right > div.sheader > div.data > div.sgeneros > a").text().trim();
    const category = categorydata.match(/([A-Z][a-z]+|\d+\+?)/g);
    const desc = $("#info > div.wp-content > p").text().trim();
    const imdb = $("#repimdb > strong").text();
    const average = $("div.custom_fields:nth-child(9) > span").text().trim()
    const director = $("#cast > div.persons > div.person > div.img > a > img").attr("alt");
    const image = $("#single > div.content.right > div.sheader > div.poster > img").attr("src");



    const episodes = [] 
    $("#seasons > div.se-c > div.se-a > ul > li").each((i, el) => {
        const title = $(el).find("div.numerando").text()
        const date = $(el).find("div > span.date").text()
        const episode_link = $(el).find("div > a").attr("href")
        episodes.push({title, date, episode_link})
    })

    const result = {
        
       data: {
            title: title,
            originalTitle: originalTitle,
            imdb: imdb,
            date: date,
            average: average,
            image: image || "",
            category: category,
            desc: desc,
            director: director,
            episodes: episodes
       
    }}

    if (episodes.length === 0) {
        console.log("No movies found with the given query.");
    } else {
        //console.log("Movies found:", movies.length);
        return result
    }
    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
        console.log(errors)
    }
}

//=======================================================

async episodeDl(query) {
    try {
        const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
        if (!query || !https.test(query)) {
            console.log("Invalid URL. Please provide a valid HTTPS URL.");
            console.log("මොකක්ද මනුස්සයෝ කරන්නෙ SinhalaSub.lk FILM URL එකක් දාපන්");
            return;
        }

        const $ = await nexara(query);

        const title = $("#info > h1").text()
        const ep_name = $("#info > div > h3").text();
        const desc = $("#info > div.wp-content > p").text().trim();
        const date = $("#info > span.date").text();


        const images = []
        $("div.g-item").each((i, el) => {
            const url2 = $(el).find("a").attr("href")
            const url  = url2.replace("\n" , "")
            images.push(url)
        })


        const downlink = [];
        const downloadLinks = $("#download > div > div > table > tbody > tr");
        downloadLinks.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");

            if (quality && size && downloadLinkOut) {
                downlink.push({ quality, size, link: downloadLinkOut });
            }
        });


        const downloadLinks3 = $("#download-03 > div > div > table > tbody > tr");
        downloadLinks3.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");

            if (quality && size && downloadLinkOut) {
                downlink.push({ quality, size, link: downloadLinkOut });
            }
        });
        

        const downloadLinks2 = $("#download-02 > div > div > table > tbody > tr");
        downloadLinks2.each((index, row) => {
            const quality = $(row).find("td:nth-child(2)").text().trim();
            const size = $(row).find("td:nth-child(3)").text().trim();
            const downloadLinkOut = $(row).find("td:nth-child(1) a").attr("href");

            if (quality && size && downloadLinkOut) {
                downlink.push({ quality, size, link: downloadLinkOut });
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
            data: {
                title: title,
                ep_name: ep_name,
                date: date,
                images: images,
                desc: desc,
                dl_links: detailedDownlink
            }
        };

        // console.dir(result, { depth: null, colors: true });
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

}

	
