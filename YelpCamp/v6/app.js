let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    Passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds")

//let Comments    = require("./models/comments");
//let User        = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Dankbutts",
    resave: false,
    saveUninitialized: false
}));

app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());



app.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    console.log("FARTTTTTT");
    res.render("campgrounds/new");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
            res.render("campgrounds/show", { campground: foundCampground });
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

//====================
//COMMENTS ROUTES
//====================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    //res.send("This will be the comment form!");
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            console.log("Error here in the comment route.");
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    });
    //res.render("comments/new");
});

app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground to show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//AUTH ROUTES

// show register form
app.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res) {
    //res.send("Signing you up...");
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        console.log("I have registered this user");
        Passport.authenticate("local")(req, res, function(){
            console.log("Redirecting to /campgrounds");
            res.redirect("/campgrounds");
        });
    });
});

// show login form
app.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
app.post("/login", Passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/failure"
    }), function(req, res) {
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//failure route
app.get("/failure", function(req, res) {
    res.send("This failed");
});

//====================


//==Server Listen==
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
    console.log(process.env.PORT);
});
