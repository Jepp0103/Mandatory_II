const express = require("express");
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Passing jSON-objects and form data in HTML-files. Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// You need to copy the config.template.json file and fill out your own secret
const config = require('./config/config.template.json');

app.use(session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: true
}));



/* Setup the routes with app */
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const electivesRoute = require('./routes/electives.js');
const nodeMailerRoute = require('./routes/nodeMailer.js');


app.use(authRoute);
app.use(usersRoute);
app.use(electivesRoute);
app.use(nodeMailerRoute);

//Using static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/home'));

/* Setup Knex with Objection */
const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');

const knex = Knex(knexfile.development);

Model.knex(knex);

//HTML route
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/login.html");
 });





const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
});