'use strict'

const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//every user has its own value of "&APPID=...." that he can see here https://home.openweathermap.org/api_keys after loggin in
rl.question('Input city: ', (answer) => {
  http.get('http://api.openweathermap.org/data/2.5/weather?q='+answer+'&APPID=eb97a1f4666f14f9cd34059905f4969b', (res) => {
    let data = '';
    res.setEncoding('utf8');

    res.on('data', (d) => {
      data += d;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(data);
      console.log(+(parsedData.main.temp)-273.15);
      rl.close();
    });
  });
});
