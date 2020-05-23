const router = require('express').Router();

const User = require('../models/User.js');
const Elective = require('../models/Elective.js');

const fs = require("fs");

router.get("/addElective", (req, res) => { //Requires login to access
    if(req.session.login) {
        const page = fs.readFileSync("./public/addElective.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/electives", (req, res) => { //Requires login to access
    if(req.session.login) {
        const page = fs.readFileSync("./public/electives.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/myElectives", async (req, res) => {
    if(req.session.login) {
        username = req.session.username;
        const usersWithElectives = await User.query().select('username').where('username', username).withGraphFetched('electives');
        const electives = usersWithElectives[0];
        const stringElectives = JSON.stringify(electives);
        console.log("Electives as strings", stringElectives);
        return res.send({ response: stringElectives});
    } else {
     return res.redirect("/login");
    }
});

//No redirecting created yet
router.post('/addElective', (req, res) => {
    const course_name = req.body.course_name;

    if (course_name) {
        console.log(course_name);
        try {
                Elective.query().insert({
                    
                    course_name
                }).then(createdElective => {
                    return res.send({ response: `The elective ${createdElective.course_name} was created` });  
                });
        } catch (error) {
            return res.status(500).send({ response: "Something went wrong with the DB" });
        }
    } 
});

module.exports = router;
