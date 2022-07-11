const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=a4597b97b38cb5a2df7d6b4cfe391a72&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const city = weatherData.name;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The wether is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius.</h1>");
      res.send();
    })
  });
})


app.listen(3000, function(){
  console.log("Server is running in port 3000.");
})
