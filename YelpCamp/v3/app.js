let express     = require("express");
let app         = express();
let bodyParser  = require("body-parser");
let mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description : String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create({
//     name: "Salmon Creek",
//     image : "http://www.hikinginbigsur.com/hikepix/salmoncreekmain.jpg",
//     description : "This is the Salmon Creek description page. If it were real, it would be a nice campground."
// }, function (err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Created campground");
//         console.log(campground);
//     }
// });

// let campgrounds = [
//     {name: "Jellystone", image: "https://i.ytimg.com/vi/ZIoFBre6CaY/maxresdefault.jpg"},
//     {name: "Kent State Park", image: "http://www.newenglandwaterfalls.com/standardpics/ct-kentfalls-pic1.jpg"},
//     {name: "Salmon Creek", image: "http://www.hikinginbigsur.com/hikepix/salmoncreekmain.jpg"},
//     {name: "Camp Crystal Lake", image: "https://img.etsystatic.com/il/03b9c9/1341144066/il_570xN.1341144066_7nnb.jpg?version=1"},
//     {name: "Big Bear", image: "https://odis.homeaway.com/odis/destination/7546f7a5-8a59-40c0-b041-12c6e9dc8d54.hw1.jpg"}
// ];

app.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    console.log("FARTTTTTT");
    res.render("new");  
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
});

// SHOW - shoes more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campgroundf with provided ID
    //render show template with that campground
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});





//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description:desc};
    
    // Create new campground and save to DB
        Campground.create(newCampground, function(err, newCreation){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
    console.log(process.env.PORT);
});