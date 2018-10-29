const express = require("express");
const app = express();
const bodyParser = ("body-parser");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");

mongoose.connect("mongodb://admin:OnlyForContact1@ds145043.mlab.com:45043/keynutrition-contact", { useNewUrlParser: true });

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/herbalife.png'));
app.set("view engine", "ejs");

// CONTACT SCHEMA
var contactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String,
    created: {type: Date, default: Date.now}
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

app.listen(process.env.PORT, function() {
    console.log("Server Started on Port: 8080");
});