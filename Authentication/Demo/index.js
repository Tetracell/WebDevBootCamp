let express = require("express");


let app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("home");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started....");
});



