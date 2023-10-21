const bcrypt = require("bcrypt");
const user = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;
    const password = req.body.password;

    // console.log('the storing details are ' + username + ' and ' + email +  phonenumber)

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // password hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await user.findOne({
      $or: [{ username }, { email }, { phonenumber }],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with the same username or email or phone number already exists' });
    }

    const data = await user.create({
      username,
      phonenumber,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ msg: 'User Created Successfully' });

     
    
    // Check if any required column is missing
  if (!username || !phonenumber || !email || !password) {
    return res.status(400).json({ error: 'Missing required information' });
  }
  } 
  
  catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(err);
  }
};
