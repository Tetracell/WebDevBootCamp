let mongoose = require("mongoose");
let Campground = require("./models/campground");


var data = [{
        name: "Cloud's Rest",
        image: "https://cascadeclimbers.com/plab/data/502/best08.JPG",
        description: "blah blah blahh"
    },
    {
        name: "Kent Falls State Park",
        image: "https://www.naturallyamazing.com/americasparks/4682.jpg",
        description: "blah blah blahh"
    },
    {
        name: "Strawberry Park",
        image: "http://www.wickedgoodtraveltips.com/wp-content/uploads/2014/10/strawberry_park_steamboat.jpg",
        description: "blah blah blahh"
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
                }
            });
        });
    });
}

module.exports = seedDB;
