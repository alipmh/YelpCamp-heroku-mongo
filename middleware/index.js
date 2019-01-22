var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash("error", "you must be logged in");
        res.redirect("/login");
    }
};

middlewareObj.campgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if (err){
                res.redirect("back");
            }
            else {
                if(campground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
};

middlewareObj.commentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if (err){
                res.redirect("back");
            }
            else {
                if(comment.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You must be logged in");
        res.redirect("back");
    }
};

module.exports = middlewareObj;