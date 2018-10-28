const express = require("express");
const app = express();
const bodyParser = ("body-parser");
let nodemailer = require('nodemailer');
let aws = require('aws-sdk');
let transporter = nodemailer.createTransport({
    SES: new aws.SES({ apiVersion: '2010-12-01' }),
    sendingRate: 1
});



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

app.post("/contact-us", function(req, res) {
    // EMAIL SCHEMA
    transporter.sendMail({
        from: 'sender@example.com',
        to: 'marbobkara@gmail.com',
        subject: 'Inquiry from ',
        text: 'I hope this message gets sent!',
        ses: {
            Statement: [
                {
                    "Effect": "Allow",
                    "Action": "ses:SendRawEmail",
                    "Resource": "*"
                }
            ]
        }
    });
    res.redirect("/thank-you");
})

app.listen(8080, function() {
    console.log("Server Started on Port: 8080");
});