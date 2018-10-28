const express = require("express");
const app = express();
const bodyParser = ("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs");

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