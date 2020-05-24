const router = require('express').Router();
const User = require('../models/User.js');
const Elective = require('../models/Elective.js');

const fs = require("fs");

router.get("/addElective", (req, res) => { //Requires login to access
    if(req.session.login) {
        const page = fs.readFileSync("./public/electives/addElective.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

router.get("/electives", (req, res) => { //Requires login to access
    if(req.session.login) {
        const page = fs.readFileSync("./public/electives/electives.html", "utf8");
        return res.send(page);
    } else {
        return res.redirect("/login");
    }
});

//Router for displaying the list of electives added to a certain user
router.get("/myElectives", async (req, res) => { //Requires login to access
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
router.post('/addElective', (req, res) => {  //Requires login to access.
    const course_name = req.body.course_name;
    const user_id = req.session.userId;
    console.log("Course name:", course_name);
    console.log("User id", user_id);

    if (course_name) {
        try {
                Elective.query().insert({
                    course_name,
                    user_id
                }).then(createdElective => {
                    return res.redirect("/addElective");
                });
        } catch (error) {
            return res.status(500).send({ response: "Something went wrong with the DB" });
        }
    } 
});

module.exports = router;
