const User = require('../../../pkg/user/userSchema');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const sendEmail = require('./nodeMailer');
const crypto = require('crypto');

const signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name ,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true
    });

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        user: newUser
      }
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err)
  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Please provide email and password.');

    const user = await User.findOne({ email });

    if (!user) return res.status(401).send('invalid email or password');

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if(!isPasswordValid) return res.status(402).send('Invalid email or password');

    const token = jwt.sign({ 
      id: user._id,
      role: user.role,
     }, 
     process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    console.log(token);

    res.cookie('jwt', token.toString(), {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: 'Success',
      token
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err)
  }
};

const forgotPassword = async (req, res) => {

  try {
    const user = await User.findOne({
      email: req.body.email
    });
  
    if (!user) {
      return res.status(404).send('User does not exist please create an account!');
    };
  
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    console.log('Generated token:', resetToken);
    console.log('Hashed token:', hashedToken);
  
    user.passwordResetToken = hashedToken;
    user.passwordResetExpired = Date.now() + 30 * 60 * 1000;
  
    await user.save({ validateBeforeSave: false });
  
    const resetUrl = `http://localhost:3000/reset-password/${hashedToken}`;
  
    const message = resetUrl;
  
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(30 min valid)',
      message: message
    });
  
    res.status(200).json({
      status: 'Success',
      message: 'Token sent to email'
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  };
};

const resetPassword = async (req, res) => {
  try {
    const userToken = req.params.token;

    // console.log('user token:', userToken);
  
    // console.log('hashed token:', hashedToken);

    const user = await User.findOne({
      passwordResetToken: userToken,
      passwordResetExpired: { $gt: Date.now() }
    });

    console.log('user:', user);

    if (!user) {
      return res.status(400).send('Token is invalid or expired');
    }

    if (!req.body.password) {
      return res.status(401).send('Password is required');
    }

    user.password = req.body.password;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true
    });

    res.status(201).json({
      status: 'Success',
      token
    });
  
  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  };
};

const logOut = (req, res) =>  {
  console.log('logout');
  res.clearCookie('jwt');
  res.status(204).json({
    message: 'Logout Succesfull'
  });
};

module.exports = {
  signUp,
  login,
  logOut,
  forgotPassword,
  resetPassword
}