const axios = require("axios")
const cheerio = require("cheerio")
require("dotenv").config()
const CREATOR = "UDMODZ"




module.exports = class zoom {
    constructor() {}
  
async search(query) {
    try {

	const url = `https://zoom.lk/?s=${query}`;
const response = await axios.get(url);
const $ = cheerio.load(response.data);
const movies = [];

    $("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((c, d) => {
            const time = $(d).find("div.item-details > div > span > time").text()
            const title = $(d).find("div.item-details > h3 > a").text()
            const author = $(d).find("div.item-details > div > span > a").text()
            const desc = $(d).find("div.item-details > div.td-excerpt").text()
            const comments = $(d).find("div.item-details > div > span.td-module-comments a").text()
            const image = $(d).find("div.td-module-thumb > img").attr("src")
	    const link = $(d).find("div.item-details > h3 > a").attr("href")
           
movies.push({title, link, image, author, desc, comments,})
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


//================================================

async movieDl(query) {
    try {
        
        var response = await axios.get(query);
const $ = cheerio.load(response.data);
      const title = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
      const author = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_64.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > ul > li > a").text();
      const view = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
      const date = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
      const size = $("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
      const dllink = $("div.tdb-block-inner.td-fix-index > p > a").attr("href");
        const result = {
            data: {
                title: title,             
                size: size,
		date: date,
		author: author,
		view: view,
                dl_link: dllink
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

}

	
