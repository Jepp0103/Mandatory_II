const router = require('express').Router();

const User = require('../models/User.js');

router.get('/users', async (req, res) => {
    const allUsersWithElectives = await User.query().select('username').withGraphFetched('electives');
    return res.send({ response: allUsersWithElectives });
});


module.exports = router;
