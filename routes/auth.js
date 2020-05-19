const router = require('express').Router();
const User = require("../models/User.js");
const bodyParser = require('body-parser');
const session = require('express-session');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
const mysql = require('mysql');
const fs = require("fs");


router.get("/login", (req, res) => {
	const page = fs.readFileSync("./public/login.html", "utf8");
    return res.send(page);
 });


router.get("/home", (req, res) => {
    if(req.session.login) {
        const page = fs.readFileSync("./public/home.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/username", (req, res) => {
    return res.send({ response: req.session });
});


//Checks if the user input is the same as in the database//
router.post('/home', async (req, res) => {
    const { username, password } = req.body;
    try {
        const accountInfo = await User.query().select("username", "password").where("username", username);
        if (accountInfo.length === 1) {
            if (password === accountInfo[0].password) {
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