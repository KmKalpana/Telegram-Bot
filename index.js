// @ts-nocheck
const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api');
const https = require('https');
const port = 8000;
const Token = '5924328793:AAEA-3weujA5O30Z6up-eo2zhosDP_xH43s';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '08c7795a32mshe3a9c4179b4f08dp1fcf29jsnd641d1111616',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
const bot = new telegramBot(Token,{polling : true});

bot.on('message', (message)=>{
    const val = message.text;
        https.get(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${val}`, options,(response)=>{
        response.on('data',(data)=>{
            const weather = JSON.parse(data);
            bot.sendMessage(message.from.id,`The temperature of ${val} is ${weather.temp} degree`);
            console.log(weather["temp"]);
        })
     })
     https.get(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${val}`, options
     ,(response)=>{
        response.on('data',(data)=>{
            const weather = JSON.parse(data);
            setInterval(function(){
                bot.sendMessage(message.from.id,`The temperature of  ${val} is ${weather.temp} degree celcius.`)
            },3600000);
        })
     })
})
app.listen(port, function(error){
    console.log('successfully connected');
})