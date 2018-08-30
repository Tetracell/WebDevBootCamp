let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment")


let data = [{
        name: "Cloud's Rest",
        image: "https://cascadeclimbers.com/plab/data/502/best08.JPG",
        description: "A nice mountain."
    },
    {
        name: "Kent Falls State Park",
        image: "https://www.naturallyamazing.com/americasparks/4682.jpg",
        description: "WOODS. WATER. Like one building that had an old Star Wars arcade game in it in the 90's."
    },
    {
        name: "Strawberry Park",
        image: "http://www.wickedgoodtraveltips.com/wp-content/uploads/2014/10/strawberry_park_steamboat.jpg",
        description: "More or less an RV city. Not so much a campground as it is a summer camp. Wonderful nonetheless."
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        //Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Added campground");
                    //create comment on each campground
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            data.comments.push(comment);
                            data.save();
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
