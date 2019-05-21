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


// MIDDLEWARE
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/herbalife.png'));
app.use(bodyParser.json());
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

// APPLICATIONS SCHEMA
var applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    jobTitle: String,
    company: String
}, {
    collection: "applications"
});


var Contact = mongoose.model("Contact", contactSchema);
var Apply = mongoose.model("Apply", applicationSchema);

// ROUTES
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/thank-you", function(req, res) {
    res.render("thank-you");
})

app.get("/contact-us", function(req, res) {
    res.render("contact-us");
})

app.get("/apply", function(req, res){
    res.render("apply");
})

app.post("/apply", function(req, res) {
    var number = req.body.phone;
    if(number.length === 10) {
        var area = number.substring(0, 3);
        var firstThree = number.substring(3, 6);
        var lastFour = number.substring(6, 10);
        number = "(" + area + ") " + firstThree + "-" + lastFour;
    } else if (number.length === 7) {
        var firstThree = number.substring(0, 3);
        var lastFour = number.substring(3, 6);
        number = firstThree + "-" + lastFour;
    }

    Apply.create ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        phone: number,
        jobTitle: req.body.jobTitle,
        company: req.body.company
    });

    res.redirect("/thank-you")
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
    Contact.find({}, function(err, allContact){
        if(err) {
            console.log(err);
        } else {
            res.render("dashboard", {contact: allContact})
        }
    })
})

app.post("/dashboard", isLoggedIn, function(req, res){
    Contact.deleteOne({ _id: req.body.id }, function(err) {
        id = req.body.id;
        console.log(id);
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/dashboard");
        }
    });
})

app.get("/applications", isLoggedIn, function(req, res){
    Apply.find({}, function(err, allApplications){
        if(err) {
            console.log(err);
        } else {
            res.render("applications", { applications: allApplications });
        }
    })
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