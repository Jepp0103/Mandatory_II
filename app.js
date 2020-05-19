const express = require("express");
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

//Passing jSON-objects and form data in HTML-files.
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

/* Setup the routes with app */
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute);
app.use(usersRoute);

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
})