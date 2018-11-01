const express = require("express");
const app = express();
const bodyParser = ("body-parser");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
require("dotenv").config();

mongoose.connect("mongodb://admin:OnlyForContact1@ds145043.mlab.com:45043/keynutrition-contact", { useNewUrlParser: true });

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/herbalife.png'));
app.set("view engine", "ejs");

// CONTACT SCHEMA
var contactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String
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
        email: "marbobkara@gmail.com",
        name: "Bobby",
        message: "Hello World!"
    });

    res.redirect("/thank-you");
})

app.listen(process.env.PORT, function() {
    console.log("Server Started on Port: " + process.env.PORT);
});