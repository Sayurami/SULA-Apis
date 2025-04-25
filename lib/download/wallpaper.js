const cheerio = require('cheerio')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
function wallpaper(query, page = '1') {
    return new Promise(function(resolve, reject) {
        let linknya = `https://www.besthdwallpaper.com/search?${page==='1'? 'CurrentPage=1&q=' : 'q='}${query}${page!=='1'? '&CurrentPage='+page : ''}`
        fetch(linknya)
        .then(function(res) {
            return Promise.resolve(res.text())
        })
        .then(function(data) {
            let $ = cheerio.load(data)
            let results = []
            $('div.grid-item').each(function (a, b) {
                results.push({
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: `https://www.besthdwallpaper.com${$(b).find('div.info > a').attr('href')}`,
                    image: [
                        $(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'),
                        $(b).find('picture > source:nth-child(1)').attr('srcset'),
                        $(b).find('picture > source:nth-child(2)').attr('srcset')
                    ]
                })
            })
            return Promise.resolve(results)
        })
        .then(function(data) {
            setTimeout(function() {
                resolve(data)
            }, Math.floor(Math.random() * 1000))
        })
    })
}

module.exports = {wallpaper}
