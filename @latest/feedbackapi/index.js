const express = require('express');
const nodemailer = require('nodemailer');
const JSONTransport = require('nodemailer/lib/json-transport');

const PORT = 3000;

function mailTransporter(name, email, subject, body) {
  const mailSubject = "New Feedback submission - " + subject;
  const messageBody = "New Feedback submission from " + name + " - " + email + ". " + "\n\n" + body
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'wmsnippetgetter@gmail.com',
      pass: 'tcrm inuj wfuj yzea'
    }
  });

  const mailOptions = {
    from: "wmsnippetgetter@gmail.com",
    to: "swandrack@gmail.com",
    subject: mailSubject,
    text: messageBody
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT)
})

app.get('/api/feedback', (req, res) => {
  res.send("Hello from the feedback form :)")
})

app.post('/api/feedback', (req, res) => {
  const requestData = JSON.stringify(req.body);
  console.log('Received Data', requestData)
  message = JSON.parse(requestData)
  mailTransporter(message.name, message.subject, message.body)
  res.status(200).send("Data received successfully!")
});