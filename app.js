const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "a4597b97b38cb5a2df7d6b4cfe391a72";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" +units;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The wether is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();

      console.log(url);
    })
  });

});


app.listen(3000, function(){
  console.log("Server is running in port 3000.");
})
