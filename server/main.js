import fetch from "node-fetch";
import jsdom from "jsdom";
import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";

var app = express()

const apiUrl = 'https://dailyverses.net/get/random?language=nvi-pt';


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use("/",express.static('public'))
app.get('/api', async function (req, res) {
    const qtd = req?.query?.qtd || 1;
    const response = await getVerses(qtd);
    const output = response.map(text => parseText(text));
  res.json(output);
})

app.listen(8000, function () {
  console.log('listening: http://localhost:8000')
})

function parseText(text){
    const dom = new jsdom.JSDOM(text);
    const bibleText = dom.window.document.querySelector(".bibleText").innerHTML;
    const bibleVerse = dom.window.document.querySelector("a").innerHTML;
    return {
        text:bibleText,
        source:bibleVerse
    }
}
async function getText(){
    const response = await fetch(apiUrl);
    return await response.text();
}
async function getVerses(qtd){
    let texts = [];
    for(let i=0;i<qtd;i++){
        texts.push(getText());
    }
    return await Promise.all(texts);
}