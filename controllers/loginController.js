require("dotenv").config();
const signup = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// TODO Generate a token for decrypting password
function generateAccessToken (id, mail) {
  return jwt.sign(
    { userId: id, mail },
    process.env.GENERATEACCESSTOKEN
  )
}

exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await signup.findOne({ email });
    if (user) {
      // console.log("Stored hashed password:", user.password);
      // console.log("Entered password:", password);
      // comparing password current and stored password
      const isMatched = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isMatched);

      if (isMatched) {
        // sending response back with token if user is authenticated
        res.status(200).json({
          msg: "User logineed successfully",
          token: generateAccessToken(user.id, email),
        });
      } else {
        res.status(401).json({ error: "User not authorized" });
      }
    } else {
      res.status(404).json({ error: "User is not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
