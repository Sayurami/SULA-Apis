//=================npm======================
const express = require("express");
const router = express.Router();
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const cheerio = require("cheerio");
const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");


const { deranaNewsList, deranaGetLink, deranaLatestNews } = require('./lib/news/derana');
const { hirunews, sirasa, itn, siyatha, nethnews, lnw, silumina, dasathalankanews, gossiplankanews, derana, cricbuzz, server } = require('./lib/news/other');
const Lankadeepa = require('./lib/news/lankadeepa');
const Bbc = require('./lib/news/bbc');




const { logo } = require("./lib/more/logo");
const { random_mail, get_mails } = require("./lib/more/mail");
const { tempnumber, tempnumbercode } = require("./lib/more/tempnumber");
const { ephoto360 } = require("./lib/more/ephoto360");


const { blackbox, blackbox4 } = require("./lib/ai/blackbox");


const { ytmp3, ytmp4 } = require("./lib/download/ytdl");
const { pinterestimg } = require("./lib/download/piniimg");
const { twitter } = require("./lib/download/tw");
const { wallpaper } = require("./lib/download/wallpaper");
const { tiktokdl } = require("./lib/download/tiktok");
const { mfire } = require("./lib/download/mfire");
const { modwhatsappdl, modwadl } = require("./lib/download/modwhatsappdl");
const { fbdown } = require("./lib/download/fbdown");
const { sdl } = require("./lib/download/soundcloud");
const { appletone, appletonedl } = require("./lib/download/appletone");


const { getAccessToken, searchSong} = require("./lib/search/sposearch");
const { ssearch } = require("./lib/search/scloud")
const { apks1, apkd1 } = require("./lib/search/apkfab");
const { stickersearch } = require("./lib/search/stic");
const { modwhatsapp } = require("./lib/search/modwhatsapp");
const { happymodSearch } = require("./lib/search/happymod");
const { wallpaperscraft } = require("./lib/search/wallpaper");

//========================lib============================
const err_mg = 'Server is busy now. Try again later. Please report to the help center !!'
const notwork = 'This url type not working on this site !!'
const l = console.log
const CREATOR = "UDMODZ"
const err_mg2 = "Internal Server Error. "

//====================================functions===========================

async function count(){
    return await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya")
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const runtime = (seconds) => {
	seconds = Number(seconds)
	var d = Math.floor(seconds / (3600 * 24))
	var h = Math.floor(seconds % (3600 * 24) / 3600)
	var m = Math.floor(seconds % 3600 / 60)
	var s = Math.floor(seconds % 60)
	var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
	return dDisplay + hDisplay + mDisplay + sDisplay;
}


router.get("/", (req, res) => {
    res.send("./html/index.html");
});

router.get("/changelog", (req, res) => {
    fs.readFile("./html/changelog.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

router.get("/status", (req, res) => {
        res.send({runtime: `${runtime(process.uptime())}`,ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`});
});



//================================================= A I =================================================
router.get("/ai", (req, res) => {
    fs.readFile("./html/ai.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});


router.get("/ai/blackboxv4", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Prompt !'});
    blackbox4(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/ai/blackbox", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Prompt !'});
    blackbox(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/ai/photoleap", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: '@vihangayt0', err: 'Need Prompt !'});
    axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt='+url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

//================================================= ＭＯＲＥ =================================================
router.get("/more", (req, res) => {
    fs.readFile("./html/more.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});


router.get("/more/logo", (req, res) => {

	logo()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/more/tempmail", (req, res) => {
    random_mail()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});



router.get("/more/get_inbox_tempmail", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need tempmail id !'});
    get_mails(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});



router.get("/more/tempnumber", (req, res) => {
    tempnumber()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/more/tempnumbercode", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need tempmail number !'});
    tempnumbercode(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});



router.get("/more/ephoto360", (req, res) => {
	const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need ephoto360 url !'});
    var text1 = req.query.texk
	if (!text1 ) return res.json({ status : false, creator : CREATOR, message : "[!] masukan parameter text1"}) 
    ephoto360(url, [text1])
        .then((dadsta) => {
	res.set({'Content-Type': 'image/png'})	
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});




//================================================= S E A R C H =================================================
router.get("/search", (req, res) => {
    fs.readFile("./html/search.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

router.get("/search/soundcloud", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Song Name !'});
    ssearch(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/search/spotify", async(req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Song Name !'});
    const accessToken = await getAccessToken();
    searchSong(url, accessToken)
.then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/search/apkfab", async(req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Apk Name !'});
    apks1(url)
.then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/search/sticker", (req, res) => {
    const url = req.query.q || req.query.query;
    if(!url) return res.send({status: false, owner: '@vihangayt0', err: 'Need query to search !'});
    stickersearch(url)
.then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});



router.get("/search/modwhatsapp", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a whatsapp name !'});
    modwhatsapp(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});



router.get("/search/happymodSearch", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a name !'});
    happymodSearch(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});

router.get("/search/wallpaperscraft", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a image name !'});
    wallpaperscraft(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});




//================================================= N E W S =================================================
router.get("/news", (req, res) => {
    fs.readFile("./html/news.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});


router.get("/news/derana", async (req, res) => {

	try{
		
const list = await deranaNewsList()
const data = await deranaGetLink(list.data[0].url)
	
      const newsData = {
    "status": true,
    "creator": CREATOR,
    "result": {
        title: data.data.title,
        desc: data.data.desc,
        image: data.data.image,
        date: data.data.date,
        url: data.data.url
      }};

      res.json(newsData);
      count()
  } catch (error) {
    res.status(500).json({status: false, creator: CREATOR, error: err_mg });
	}})



router.get("/news/sirasa", (req, res) => {

	sirasa()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/hiru", (req, res) => {

	hirunews()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/bbc", (req, res) => {

	   const bbc = new Bbc()   
        bbc.news()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/lankadeepa", (req, res) => {

	const lankadeepa = new Lankadeepa()   
        lankadeepa.search()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});



router.get("/news/itn", (req, res) => {

	itn()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/siyatha", (req, res) => {

	siyatha()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/nethnews", (req, res) => {

	nethnews()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/news/lnw", (req, res) => {

	lnw()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/news/silumina", (req, res) => {

	silumina()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/news/dasathalankanews", (req, res) => {

	dasathalankanews()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/news/gossiplankanews", (req, res) => {

	gossiplankanews()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

router.get("/news/cricbuzz", (req, res) => {

	cricbuzz()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});


router.get("/news/server", (req, res) => {

	server()
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg});
            l(err)
        });
});

//================================================= M O V I E =================================================

router.get("/movie", (req, res) => {
    fs.readFile("./html/movie.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});


router.get("/movie/sinhalasub/search", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a movie of tvshow name !'});
    sinhalasub.search(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});

router.get("/movie/sinhalasub/movie", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, creator: CREATOR, err: 'Please give me a sinhalasub movie url !'});
    sinhalasub.movieDl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});

router.get("/movie/sinhalasub/tvshow", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, creator: CREATOR, err: 'Please give me a sinhalasub tvshow url !'});
    sinhalasub.tvshow(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/movie/sinhalasub/episode", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me a sinhalasub episode url !'});
    sinhalasub.episodeDl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});
		    
//----------------------------------------------------------------------
router.get("/movie/pirate/search", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a movie of tvshow name !'});
    pirate.search(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/movie/pirate/movie", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, creator: CREATOR, err: 'Please give me a pirate movie url !'});
    pirate.movieDl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});




router.get("/movie/zoom/search", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a movie of subtitle name !'});
    zoom.search(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/movie/zoom/movie", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, creator: CREATOR, err: 'Please give me a sinhalasub movie url !'});
    zoom.movieDl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});



router.get("/movie/firemovie", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a name !'});
    firemovie(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


//================================================= D O W N L O A D =================================================

router.get("/download", (req, res) => {
    fs.readFile("./html/download.html", 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});



router.get("/download/apkfab", (req, res) => {
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Apk Id !'});
    apkd1(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});

router.get("/download/modwhatsappdl", (req, res) => {
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Apk Id !'});
    modwhatsappdl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/download/modwadl", (req, res) => {
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, err: 'Need Apk Id !'});
    modwadl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});



router.get("/download/piniimg", (req, res) => {
   const text = req.query.q || req.query.text;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me some words !'});
      pinterestimg(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});

router.get("/download/twitter", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, result: 'Please give me a valid twitter video url !'});
      twitter(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});


router.get("/download/ytmp3", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, result: 'Please give me a valid ytdl video url !'});
      ytmp3(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});

router.get("/download/ytmp4", (req, res) => {
	
    const url = req.query.url || req.query.link;
    if(!url) return res.send({status: false, owner: CREATOR, result: 'Please give me a valid ytdl video url !'});
      ytmp4(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});


router.get("/download/wallpaper", (req, res) => {
	
    const q = req.query.text || req.query.q
    const page = req.query.page
    if(!q) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me query !'});
    if(!page) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me a page !'});
     wallpaper(q,page)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});


router.get("/download/tiktokdl", (req, res) => {
	
    const url = req.query.url || req.query.link

    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me tiktok url !'});
     tiktokdl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});




router.get("/download/mfire", (req, res) => {
	
    const url = req.query.url || req.query.link

    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me mediafire url !'});
     mfire(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});


router.get("/download/fbdown", (req, res) => {
	
    const url = req.query.url || req.query.link

    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me fb url !'});
     fbdown(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});



router.get("/download/soundcloud", (req, res) => {
    const url = req.query.url || req.query.link;
    if(!url.includes('m.soundcloud.com')) return res.send({status: false, owner: CREATOR, err: 'Wrong url !'});
    sdl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});


router.get("/download/appletone", (req, res) => {
	
    const text = req.query.text || req.query.q;
    if(!text) return res.send({status: false, owner: CREATOR, result: 'Please give me a name !'});
    appletone(text)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta});
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: err_mg });
            l(err)
        });
});



router.get("/download/appletonedl", (req, res) => {
	
    const url = req.query.url || req.query.link

    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me appletone url !'});
     appletonedl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});






module.exports = router;
