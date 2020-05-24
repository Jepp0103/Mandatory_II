const router = require('express').Router();
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const saltrounds = 12;
const bodyParser = require('body-parser');
const session = require('express-session');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
const mysql = require('mysql');
const fs = require("fs");



router.get("/login", (req, res) => {
    bcrypt.compare("password", "$2b$12$ivRBaGRMAc5VSV68QVkBsel8Im6xv6ybGZU55QTRNN8W3ufmPG8da");
	const page = fs.readFileSync("./public/login.html", "utf8");
    return res.send(page);
});


router.get("/home", (req, res) => {
    if(req.session.login) {
        const page = fs.readFileSync("./public/home/home.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/username", (req, res) => {
    return res.send({ response: req.session });
});

router.get("/password", (req, res) => {
    return res.send({ response: req.session });
});

//Checks if the user input is the same as in the database. Haven't 
router.post('/home', async (req, res) => { //Requires login to access page.
    const { username, password } = req.body;
    try {
        const accountInfo = await User.query().select("id", "username", "password").where("username", username);
        if (accountInfo.length !== 1) {
            return res.redirect("/login")
        }
        if (accountInfo.length === 1) {
            console.log(req.session);
            console.log("Session id:", accountInfo[0].id)
            if (password === accountInfo[0].password) {
                req.session.userId = accountInfo[0].id;
                console.log("Is this the session id?", req.session.userId);
                req.session.login = true;
                req.session.username = username;
                return res.redirect("/home");
            }
        }
    }
    catch(error) {
        return res.send(error);
    }
});

router.post("/logout", (req, res) => {
	req.session.login = undefined;
    req.session.username = undefined;
	return res.redirect("/login");
});

module.exports = router;