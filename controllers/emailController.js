const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendUrgentEmail = () => {
  const msg = {
    to: "to@email.com",
    from: "from@email.com",
    subject: "Email Subject ",
    text: "Email text",
    html: "Email HTML",
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((err) => {
      console.error(err);
    });
};
