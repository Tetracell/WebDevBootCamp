let express = require("express");
let mongoose = require("mongoose");
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


