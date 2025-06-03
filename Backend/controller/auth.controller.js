import User from "../models/user.model.js"

import bcryptjs from "bcrypt"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js"


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  const isValidUser = await User.findOne({ email })

  if (isValidUser) {
    return next(errorHandler(400, "User already Exist"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()

 res.cookie("access_token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
 }).status(200).json({
  success: true,
  message: "Login Successful!",
  user: rest,
    })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    const { password: pass, ...rest } = validUser._doc

 res.cookie("access_token", token, {
  httpOnly: true,
  secure: true,       // important on Render/Netlify
  sameSite: "None"    // cross-origin cookie support
}).status(200).json({
  success: true,
  message: "Login Successful!",
  user: rest,          // ✅ Wrap inside 'user'
})
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
   res.clearCookie("access_token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

res.status(200).json({
  success: true,
  message: "User logged out successfully",
})
  } catch (error) {
    next(error)
  }
}
