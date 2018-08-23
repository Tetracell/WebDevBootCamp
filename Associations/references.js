var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");
mongoose.connect("mongodb://localhost/blog_demo_2");

























// user.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


// Post.create({
//     title:"This is the title of a post pt 3",
//     content:"hey there buddy here's another post, probably one of two. who knows"
// }, function(err, post){
//         User.findOne({email:"bob@gmail.com"}, function(err, foundUser){
//             if (err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
// });

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err)
    } else {
        console.log(user);
    }
});