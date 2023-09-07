const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
// const { createJWT } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email Already Exists')
  }
  const isFirstAccount = (await User.countDocuments({})) == 0
  const role = isFirstAccount ? 'admin' : 'user'
  const user = await User.create({ name, email, password, role })

  // const tokenUser = { name: user.name, userID: user._id, role: user.role }
  // const token = createJWT({ payload: tokenUser })

  // const oneDay = 1000 * 60 * 60 * 24

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  //   secure: process.env.NODE_ENV === 'production',
  //   signed: true,
  // })
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
const login = async (req, res) => {
  res.send('Login')
}
const logout = async (req, res) => {
  res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
