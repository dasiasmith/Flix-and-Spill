const router = require("express").Router();
const { User } = require("../../models");
const nodemailer = require("nodemailer");

// get user account
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// set up user account
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.USER_PASS, // generated ethereal password
      },
    });

    const options = {
      from: process.env.USER_EMAIL, // sender address
      to: `${userData.email}`, // list of receivers
      subject: "Welcome to Flix&Spill", // Subject line
      text: "Hello world?",
      html: `
      <p>Welcome, ${userData.name}!</p>
      <p>Thanks for sign up to Flix&Spill. You're now part of a commmunity that connects movie lovers across the world. <p>
      <p>Flix&Spill gives global users a open platform to view, comment and share thoughts for movies and shows. 
      <p>If you are an entertainment fan looking for a recommendation, or to share an opinion, you have come to the right place.</p>
     
      <p>Don't wait and get started by visiting us at <a href="">Flix&Spill</a>.</p>
      <p>Flix&Spill Team</p>
      <p><a href="mailto:flixandspill@gmail.com">Email us</a> with any questions!<p>`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log("err--->: ", err);
        return;
      }
      console.log(info.response);
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
