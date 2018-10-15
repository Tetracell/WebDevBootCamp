let express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/user"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth_demo_app");


let app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("home");
})

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started....");
});



