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

app.get('/', async function (req, res) {
    const qtd = req?.query?.qtd || 1;
    const response = await getVerses(qtd);
    // const response = [
    //     "<div class=\"dailyVerses bibleText\">O Senhor conduza o coração de vocês ao amor de Deus e à perseverança de Cristo.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/2-tessalonicenses/3/5/nvi-pt\" rel=\"noopener\" target=\"_blank\">2 Tessalonicenses 3:5</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Todos os caminhos do homem lhe parecem justos, mas o SENHOR pesa o coração.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/proverbios/21/2/nvi-pt\" rel=\"noopener\" target=\"_blank\">Provérbios 21:2</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Que a paz de Cristo seja o juiz em seu coração, visto que vocês foram chamados para viver em paz, como membros de um só corpo. E sejam agradecidos.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/colossenses/3/15/nvi-pt\" rel=\"noopener\" target=\"_blank\">Colossenses 3:15</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Por sua decisão ele nos gerou pela palavra da verdade, a fim de sermos como que os primeiros frutos de tudo o que ele criou.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/tiago/1/18/nvi-pt\" rel=\"noopener\" target=\"_blank\">Tiago 1:18</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Instrua a criança segundo os objetivos que você tem para ela, e mesmo com o passar dos anos não se desviará deles.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/proverbios/22/6/nvi-pt\" rel=\"noopener\" target=\"_blank\">Provérbios 22:6</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Portanto, humilhem-se debaixo da poderosa mão de Deus, para que ele os exalte no tempo devido.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/1-pedro/5/6/nvi-pt\" rel=\"noopener\" target=\"_blank\">1 Pedro 5:6</a></div>",
    //     "<div class=\"dailyVerses bibleText\">O homem bom tira coisas boas do bom tesouro que está em seu coração, e o homem mau tira coisas más do mal que está em seu coração, porque a sua boca fala do que está cheio o coração.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/lucas/6/45/nvi-pt\" rel=\"noopener\" target=\"_blank\">Lucas 6:45</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Quem muito fala trai a confidência, mas quem merece confiança guarda o segredo.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/proverbios/11/13/nvi-pt\" rel=\"noopener\" target=\"_blank\">Provérbios 11:13</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Esta é a confiança que temos ao nos aproximarmos de Deus: se pedirmos alguma coisa de acordo com a vontade de Deus, ele nos ouvirá.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/1-joao/5/14/nvi-pt\" rel=\"noopener\" target=\"_blank\">1 João 5:14</a></div>",
    //     "<div class=\"dailyVerses bibleText\">Ele respondeu: “Antes, felizes são aqueles que ouvem a palavra de Deus e lhe obedecem”.</div><div class=\"dailyVerses bibleVerse\"><a href=\"https://dailyverses.net/pt/lucas/11/28/nvi-pt\" rel=\"noopener\" target=\"_blank\">Lucas 11:28</a></div>",
    //   ]; 
    const output = response.map(text => parseText(text));
  res.json(output);
})

app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 80')
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