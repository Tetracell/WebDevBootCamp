// let express = require("express");
// let app = express();
// let bodyParser = require("body-parser");
// let mongoose = require("mongoose");

let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMEA SETUP

let campgroundSchema = new mongoose.Schema({
    name : String,
    image: String
    });

let campgrounds = [
    {name: "Jellystone", image: "https://i.ytimg.com/vi/ZIoFBre6CaY/maxresdefault.jpg"},
    {name: "Kent State Park", image: "http://www.newenglandwaterfalls.com/standardpics/ct-kentfalls-pic1.jpg"},
    {name: "Salmon Creek", image: "http://www.hikinginbigsur.com/hikepix/salmoncreekmain.jpg"},
    {name: "Camp Crystal Lake", image: "https://img.etsystatic.com/il/03b9c9/1341144066/il_570xN.1341144066_7nnb.jpg?version=1"},
    {name: "Big Bear", image: "https://odis.homeaway.com/odis/destination/7546f7a5-8a59-40c0-b041-12c6e9dc8d54.hw1.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //res.render("campgrounds");
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");  
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //res.send("You hit the post route");
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
    console.log(process.env.PORT);
});