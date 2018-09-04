let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let Campground = require("./models/campground");
var seedDB = require("./seeds");
//let Comments    = require("./models/comments");
//let User        = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    console.log("FARTTTTTT");
    res.render("new");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

// SHOW - shoes more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campgroundf with provided ID
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { campground: foundCampground });
        }
    });
});





//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {

    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = { name: name, image: image, description: desc };

    // Create new campground and save to DB
    Campground.create(newCampground, function(err, newCreation) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
    console.log(process.env.PORT);
});
