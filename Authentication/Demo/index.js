let express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");



let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "This is a secret phrase?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes ----------------------

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret"); // I don't think anything is preventing me from getting here without a login yet. UPDATE : Will come from the middleware
                            // that checks status of "isLoggedIn"
});

// Auth routes

app.get("/register", function(req, res) {
    res.render("register");
});

// handling user signup
app.post("/register", function(req, res) {
    req.body.username;
    req.body.password;
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect('/secret');
        });
    });
    //res.send("REGISTER POST ROUTE");
});

// login routes
// render login form
app.get("/login", function(req, res){
    res.render("login");
})

//middleware
app.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"}),
        function(req, res){
});

//logout route
app.get("/logout", function(req, res) {
    //res.send("Ok, i will log out out. Eventually...")
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }    
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started....");
});
