const router = require('express').Router();
const nodemailer = require("nodemailer");
const fs = require("fs");


router.get('/nodeMailer', (req, res) => {
    const page = fs.readFileSync("./public/nodeMailer.html", "utf8");
    return res.send(page);
});

router.post('/nodeMailer', (req, res) => {
    const senderOutput = `
        <h2> New mail received from:</h2>  
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;  

    //Nodemailer 
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'jeppendyekjaer@gmail.com', // generated ethereal user
        pass: 'jeppe123' 
      },
      tls: { 
          rejectUnauthorized: false 
      }
    });
  
    // send mail with defined transport object
    let mailInfo = {
      from: '"Jeppe" <jeppendyekjaer@gmail.com>', // sender address
      to: "nannestadhansen@gmail.com", // list of receivers
      subject: "Mail message", // Subject line
      text: "Hello world?", // plain text body
      html: senderOutput // html body
    };

    transporter.sendMail(mailInfo, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    res.render('contact', {msg: 'Email has been sent'});
});

  module.exports = router;
