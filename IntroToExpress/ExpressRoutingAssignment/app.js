let express = require("express");
let app = express();

app.get("/", function(req, res){
  res.send("Hi there, welcome to my assignment!");
});

//--------------------------------

// app.get("/speak/pig", function(req, res){
//   res.send("The pig says 'Oink'");
// });

// app.get("/speak/cow", function(req, res){
//   res.send("The cow says 'Moo'");
// });

// app.get("/speak/dog", function(req, res){
//   res.send("The dog says 'Woof Woof!");
// });

// //--------------------------------

// app.get("/repeat/hello/3", function(req, res){
//     res.send("hello hello hello");
// })

// app.get("/repeat/hello/5", function(req, res){
//     res.send("hello hello hello hello hello");
// })

// app.get("/repeat/blah/2", function(req, res){
//     res.send("blah blah");
// })

//----------------------------------

app.get("/speak/:animal", function(req, res){
    let sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
    };
    let animal = req.params.animal.toLowerCase();
    let sound = sounds[animal];
    res.send(sound);
});

app.get("/repeat/:message/:times", function(req, res){
    let message = req.params.message;
    let times = Number(req.params.times);
    let buildup = "";
    for (let i = 0; i < times; i++){
        buildup+=' ' + message;
    }
    res.send(buildup);
});

app.get("*", function(req, res){
    res.send("Get the fuck out of here");
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started");
});