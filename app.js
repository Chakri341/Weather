const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityName;
const apikey="c8a4a226e65b5fade98bbbe219da6cb5";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey +"&units="+unit;
https.get(url,function(response){
   console.log(response.statusCode) ;
   response.on("data",function(data){
   const weatherData = JSON.parse(data);
   const temp=weatherData.main.temp;
   const weatherDescription=weatherData.weather[0].description
   const icon=weatherData.weather[0].icon
   const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";// imp to inject carefully icon symbol
   res.write("<p>the weather is currently " +weatherDescription+"</p>") 
   res.write("<h1>The temparature in "+query+" is "+temp+" Celsius.</h1>");// should be careful in using "" and + symbols🥲🥲
   res.write("<img src=" +imageURL +">");
   res.send();
} )
})
})



app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})