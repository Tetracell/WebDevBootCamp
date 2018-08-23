let express = require("express");
let app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
  res.send("Hi there!");
});

// "/bye" => "Goodbye"

app.get("/bye", function(req, res){
    res.send("Goodbye!");   
});

app.get("*", function(req, res){
    res.send("Get the fuck out of here");
});


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started");
});