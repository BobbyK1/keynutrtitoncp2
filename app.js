const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const favicon = require("serve-favicon");
const passport = require("passport"),
      passportLocalMongoose = require("passport-local-mongoose"),
      LocalStrategy = require("passport-local");
require("dotenv").config();

mongoose.connect("mongodb://admin:OnlyForContact1@ds145043.mlab.com:45043/keynutrition-contact", { useNewUrlParser: true });

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/herbalife.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Admin Use",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set("view engine", "ejs");


// CONTACT SCHEMA
var contactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String
}, {
    collection: "contacts"
});

var Contact = mongoose.model("Contact", contactSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/thank-you", function(req, res) {
    res.render("thank-you");
})

app.get("/contact-us", function(req, res) {
    res.render("contact-us");
})

app.post("/contact-us", function(req, res){
    Contact.create ({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message
    });

    res.redirect("/thank-you");
})

app.get("/admin", function(req, res){
    res.render("admin");
})

app.get("/dashboard", isLoggedIn, function(req, res){
    res.render("dashboard");
})

app.post("/admin", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/admin"
}), function(req, res){

})

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/admin");
}

app.listen(process.env.PORT, function() {
    console.log("Server Started on Port: " + process.env.PORT);
});