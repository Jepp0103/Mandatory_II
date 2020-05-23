const router = require('express').Router();
const nodemailer = require('nodemailer');
const fs = require("fs");

router.get('/nodeMailer', (req, res) => {
  if(req.session.login) {
    const page = fs.readFileSync("./public/nodeMailer.html", "utf8");
    return res.send(page);
  } else {
      return res.redirect("/login");
  }});

//Nodemailer 
router.post('/nodeMailer', (req, res) => {
      console.log("Email sent to:", req.body.email);
      console.log("Topic:", req.body.topic);
      console.log("Message:", req.body.message);
    //Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'testjeppe1995@gmail.com',
        pass: 'TestJeppe12345' 
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //Send mail with defined transport object
    let info = {
      from: '<testjeppe1995@gmail.com>', //Sender address
      to: req.body.email, //List of receivers
      subject: req.body.topic, //Subject line
      text: req.body.message, //Plain text body
    };

    transporter.sendMail(info, (error, data) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent!");
        return res.redirect("/nodeMailer");
    });
  });
    
  module.exports = router;
