const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;

const User = require('../models/User.js');

const fs = require("fs");

router.get('/users', async (req, res) => {
    const allUsersWithElectives = await User.query().select('username').withGraphFetched('electives');
    return res.send({ response: allUsersWithElectives });
});

router.get("/signUp", (req, res) => {
    const page = fs.readFileSync("./public/signUp.html", "utf8");
    return res.send(page);
});


//No redirecting created yet
router.post('/signUp', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log("Password and username:", username, password);

    if (username && password) {
        console.log(username, password);
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 characters or longer" });
        } else if (password != confirmPassword) {
            return res.status(400).send({ response: "Password and the confirmed password must be the same."})
        } else {
            try {
                User.query().select('username').where('username', username).then(foundUser => {
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: "User already exists" });
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        User.query().insert({
                            username,
                            password : hashedPassword
                        }).then(createdUser => {
                            return res.send({ response: `The user ${createdUser.username} was created` });  
                        });
                      });
                    }
                });
            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the DB" });
            }
        }
    } else {
        return res.status(400).send({ response: "Username or password missing" });
    }
});


module.exports = router;
