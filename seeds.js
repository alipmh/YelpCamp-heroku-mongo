var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name : "Lar",
        image : "https://www.iranexploration.com/ITO/wp-content/uploads/2016/12/Iran-Tour-Iran-Exploration-Lar-Nationalpark-Damavand-Trekking-2.jpg",
        description : "Lar National Park is a protected area in Mazandaran Province and Tehran Province, in northern Iran.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
    },
    {
        name : "Asalem",
        image : "https://theotheriran.files.wordpress.com/2017/12/on-the-road-from-asalem-gilan-prov-to-khalkhal-ardabil-prov-autumn-in-iran-photo-credit-mohsen-zare-tasnim-1.jpg?w=800",
        description : "Asalem is a city and capital of Asalem District, in Talesh County, Gilan Province, Iran.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
    },
       {
        name : "Clouds Forest",
        image : "http://sina01.persiangig.com/Photo/Abr%20Jungle%20096_1.jpg",
        description : "Inside the thick forests, you cannot believe that you are in Semnan province, not far from Iran’s Central Desert.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
    }
    ];


function seedDB(){
    Campground.remove({}, function(err, campground){
        if (err){
            console.log(err);
        }
        // else {
        //     console.log("campgrounds removed...");
        //     data.forEach(function(seed){
        //         Campground.create(seed , function(err, campground){
        //             if (err){
        //                 console.log(err);
        //             }
        //             else {
        //                 console.log("campground added");
        //                 Comment.create({
        //                     author : "Mas",
        //                     text : "yadam amad haan, dashtam migoftam"
        //                 }, function(err, comment){
        //                     if (err){
        //                         console.log(err);
        //                     }
        //                     else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("comment added");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;