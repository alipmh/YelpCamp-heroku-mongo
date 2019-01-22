var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");


router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/index.ejs", {campgrounds : campgrounds});
        }
    });
    
});

router.post("/campgrounds", middlewareObj.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = { name : name, image : image, price : price, description : desc, author : author};
    Campground.create(newCampground, function(err, campground){
        if (err){
            console.log("err");
        }
        else {
            req.flash("success", "Campground created");
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/campgrounds/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/show.ejs", {campground : campground});
        }
    });
});


router.get("/campgrounds/:id/edit", middlewareObj.campgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/edit.ejs", { campground : campground });
        }
    });
});

router.put("/campgrounds/:id", middlewareObj.campgroundOwnership,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if (err){
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Campground updated successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id", middlewareObj.campgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Campground deleted successfully");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;

