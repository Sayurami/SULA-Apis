const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");
const cheerio = require("cheerio");

// ------------------ Search Pirate.lk ------------------
async function pirate_search(query) {
  try {
    if (!query) throw new Error("Missing search query.");

    const $ = await nexara(`https://pirate.lk/?s=${encodeURIComponent(query)}`);
    const movies = [];

    $("#contenedor article").each((i, el) => {
      const title = $(el).find(".title a").text().trim();
      const link = $(el).find(".title a").attr("href");
      const image = $(el).find(".image img").attr("src");
      const imdb = $(el).find(".meta .rating").text().trim().toUpperCase();
      const year = $(el).find(".meta .year").text().trim();
      const type = $(el).find(".image span").text().trim();

      if (title && link) {
        movies.push({ title, imdb, year, link, image, type });
      }
    });

    return {
      status: true,
      total: movies.length,
      data: movies
    };
  } catch (err) {
    console.error("Pirate Search Error:", err.message);
    return {
      status: false,
      error: err.message
    };
  }
}

// ------------------ Movie Details & Download Links ------------------
async function pirate_movieDl(url) {
  try {
    if (!url || !/^https:\/\/pirate\.lk\/.+/.test(url)) {
      throw new Error("Invalid or missing Pirate.lk movie URL.");
    }

    const $ = await nexara(url);

    const cast = [];
    $("#cast .persons .person").each((i, el) => {
      const name = $(el).find(".name a").text().trim();
      const link = $(el).find(".name a").attr("href");
      if (name && link) cast.push({ name, link });
    });

    const title = $(".sheader .data h1").text().trim();
    const date = $(".sheader .data .extra .date").text().trim();
    const country = $(".sheader .data .extra .country").text().trim();
    const runtime = $(".sheader .data .extra .runtime").text().trim();
    const categoryData = $(".sheader .data .sgeneros").text().trim();
    const category = categoryData.split(/[\s,|]+/).filter(Boolean);
    const description = $("#info .wp-content p").first().text().trim();
    const imdb = $("#repimdb strong").text().trim();
    const tmdb = $("#info .custom_fields span strong").text().trim();
    const image = $(".sheader .poster img").attr("src");
    const director = cast.length > 0 ? cast[0].name : "Unknown";

    const downlink = [];

    $("#download .links_table table tbody tr").each((i, el) => {
      const quality = $(el).find("td").eq(1).text().trim();
      const size = $(el).find("td").eq(3).text().trim();
      const pageLink = $(el).find("td").eq(0).find("a").attr("href");
      if (quality && size && pageLink) {
        downlink.push({ quality, size, link: pageLink });
      }
    });

    const detailedDownlink = await Promise.all(
      downlink.map(async (item) => {
        try {
          const detailRes = await axios.get(item.link);
          const $detail = cheerio.load(detailRes.data);
          const directLink = $detail("#link").attr("href")?.trim();
          return { ...item, link: directLink || item.link };
        } catch (e) {
          console.warn(`Link fetch failed for ${item.link}: ${e.message}`);
          return item; // fallback to original page
        }
      })
    );

    return {
      status: true,
      title,
      imdb,
      tmdb,
      date,
      country,
      runtime,
      image,
      category,
      description,
      director,
      cast,
      dl_links: detailedDownlink
    };
  } catch (err) {
    console.error("Pirate MovieDL Error:", err.message);
    return {
      status: false,
      error: err.message
    };
  }
}

module.exports = { pirate_search, pirate_movieDl };
