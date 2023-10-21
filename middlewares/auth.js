const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

// TODO setting up middle to authenticate user
// exports.authenticate = async (req, res, next) => {
//   try {
//     const secretkey = process.env.GENERATEACCESSTOKEN
//     const token = await req.header('Authorization')
//     const user = jwt.verify(token, secretkey)
//     // console.log('userid>>>>>>>>>>..', user.userId)
//     User.findById(user.userId)
//       .then(user => {
//         // console.log(JSON.stringify(user))
//         // ! important
//         req.user = user
//         next()
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   } catch (err) {
//     console.log(err)
//     return res.status(401).json({ message: false })
//   }
// }


exports.authenticate = async (req, res, next) => {
  try {
    const secretkey = process.env.GENERATEACCESSTOKEN;
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }
    const user = jwt.verify(token, secretkey);

    User.findById(user.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "An error occurred while authenticating" });
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid token or authentication failed" });
  }
};
