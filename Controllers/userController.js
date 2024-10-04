const { hashSync, compare } = require('bcrypt');
const User = require('../Models/users');
const jwt= require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const request = req.body;
    const base64String = request.password;
    const buffer = Buffer.from(base64String, 'base64');
    const decodedString = buffer.toString('utf-8');
    const hashedPassword = hashSync(decodedString, 10); 

    const matchedUser = await User.findOne({ where: { email: request.email } });
    if(matchedUser !==null){
      res.status(400).json({message: 'Email already Exist'})
      return;
    };
    const payload = {
      user_name: request.user_name,
      email: request.email,
      gender: request.gender,
      phone: request.phone,
      password: hashedPassword,
    };
    await User.create(payload);
    res.status(201).json({ message: 'SignUp Sucessful' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

const userLogIn = async (req, res) => {
  try {
    const base64String = req.body.password;
    const buffer = Buffer.from(base64String, 'base64');
    const decodedString = buffer.toString('utf-8');
    const userEmail = req.body.useremail;
    const matchedUser = await User.findOne({ where: { email: userEmail } });
    const is_matched = await compare(decodedString, matchedUser.password);
    const token= jwt.sign({ user_id: matchedUser.id },process.env.SECRET, {expiresIn: 24*60*60}); // Have to provide a secret key in .env

    if (is_matched === true) {
      // console.log('Log In Sucessful');
      res.status(200).json({ message: 'Log In Successful',token });
    }
    else{
      // console.log('Log In Failed');
      res.status(401).json({ message: 'Password does not Matched' });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { createUser, userLogIn };
