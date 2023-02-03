const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api');
const https = require('https');
const port = 8000;
const Token = '6109520450:AAGVt10K15-V4wkrHJEY8UZ6Ar3aK-eDAc0';
const Schedule = require('node-schedule');
const bot = new telegramBot(Token,{polling : true});
// Schedule.scheduleJob('1 * * * * *', function(message){
     
//     https.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2c50165aec2425ae6da888502793b52a&units=metric`,(response)=>{
//     response.on('data',(data)=>{
//         const weather = JSON.parse(data);
//         bot.sendMessage(message.from.id,`The temperature of your area is ${weather.main.temp}  and it feels like ${weather.main.feels_like}`);
//     })
//  })
// });

bot.on('message', (message)=>{
    const val = message.text;
        https.get(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=2c50165aec2425ae6da888502793b52a&units=metric`,(response)=>{
        response.on('data',(data)=>{
            const weather = JSON.parse(data);
            bot.sendMessage(message.from.id,`The temperature of your area is ${weather.main.temp}  and it feels like ${weather.main.feels_like}`);
            
        })
     })

     https.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2c50165aec2425ae6da888502793b52a&units=metric`,(response)=>{
        response.on('data',(data)=>{
            const weather = JSON.parse(data);
            setInterval(function(){
                bot.sendMessage(message.from.id,`The temperature of your area is ${weather.main.temp}  and it feels like ${weather.main.feels_like}`);
            },3600000);
        })
     })
})
app.listen(port, function(error){
    console.log('successfully connected');
})