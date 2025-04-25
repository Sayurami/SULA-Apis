const cheerio = require("cheerio")


    async function mfire(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await require("undici").fetch(url);
            const data = await response.text();
            const $ = cheerio.load(data);
            
            let name = $('.dl-info > div > div.filename').text();
            let dl_link = $('#downloadButton').attr('href');
            let det = $('ul.details').html().replace(/\s/g, "").replace(/<\/li><li>/g, '\n').replace(/<\/?li>|<\/?span>/g, '');
            let type = $('.dl-info > div > div.filetype').text();
            let size = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span').text()
            let date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()

            var fileType = ''

            if(name.includes(".zip")) { fileType = "application/zip"
            } else if (name.includes(".pdf")) { fileType = "application/pdf" 
            } else if (name.includes(".mp4")) { fileType = "video/mp4" 
            } else if (name.includes(".mkv")) { fileType = "video/mkv"
            } else if (name.includes(".mp3")) { fileType = "audio/mpeg"
            } else if (name.includes(".7z")) { fileType = "application/x-7z-compressed"
            } else if (name.includes("jpg" || "jpeg")) { fileType = "image/jpeg"
            } else if (name.includes(".png")) { fileType = "image/png"
            } else if (name.includes(".rar")) { fileType = "application/x-rar-compressed"
            } else { fileType = "application/octet-stream" }
        

            const result = {
                fileName: name,
                fileType: fileType,
                size: size,
                date: date,    
                dl_link: dl_link
            };

            resolve(result);

        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

module.exports = { mfire }
