var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


//user 

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var user = mongoose.model("User", userSchema);

//POST

var postSchema= new mongoose.Schema({
    title:  String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);

var newUser = new user({
    email: "charlie@brown.edu",
    name: "Charlie Brown"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});