var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", { campground : campground });
        }
    });
});

router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if (err){
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }
                else {
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middlewareObj.commentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err){
            res.redirect("back");
        }
        else {
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment: comment });
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middlewareObj.commentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id", middlewareObj.commentOwnership,function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err){
           res.redirect("back");
       }
       else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;

