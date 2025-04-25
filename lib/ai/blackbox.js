/*
npm i crypto
npm i node-fetch
made by vihangayt
visit my api site: vihangayt.me
*/

//Libraries
const axios = require('axios');
const crypto = require('crypto');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

//Genarate userid
const userId = crypto.randomUUID()

//Blackbox ai scrape
async function blackbox(content) {
  try {
    const messages = [{ role: "user", content: content }, { role: "assistant", content: "Hello!" }];
    const response = await fetch("https://www.blackbox.ai/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages, id: userId, mode: "continue", userId: userId }),
    });
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


async function blackbox4(q) {
  let req = await axios
   .post(
     "https://www.useblackbox.io/chat-request-v4",
     {
       textInput: q,
       allMessages: [
         {
           user: q,
         },
       ],
       stream: "",
       clickedContinue: false,
     },
     {
       headers: {
         authority: "www.useblackbox.io",
         "content-type": "application/json",
         "x-requested-with": "XMLHttpRequest",
       },
     }
   )
 return req.data.response[0][0]
 }
 
module.exports = { blackbox, blackbox4 } 
