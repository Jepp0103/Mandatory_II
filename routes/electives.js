const router = require('express').Router();

const User = require('../models/User.js');
const Elective = require('../models/Elective.js');

const fs = require("fs");


router.get("/electives", (req, res) => { //Requires login to access
    if(req.session.login) {
        const page = fs.readFileSync("./public/electives.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/elective", (req, res) => {
    return res.send({ response: req.session });
});



module.exports = router;
