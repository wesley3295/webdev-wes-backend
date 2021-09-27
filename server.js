import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import Cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(Cors());
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get("/contact", (req, res) => res.status(200).send("test"));

//Listener
app.listen(port, () => console.log(`You're Connected on localhost:${port}`));

//nodemailer
var router = express.Router();
app.use("/", router);
//nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  auth: {
    user: process.env.EMAIL, //replace with the email address
    pass: process.env.EMAIL_PASS, //replace with the password
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/contact", Cors(corsOptions), (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "wesley3295@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
  };
  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
