import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../utils/constants/data.js";

export const register = (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const isUserExists = users.find((user) => user.email === email);
    if (isUserExists)
      return res.status(400).json({
        success: false,
        message: "User already exists with provided Email ID!",
      });

    if (password.length <= 6)
      return res.status(400).json({
        success: false,
        message: "Password length must be greater than 6!",
      });

    const newUser = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    };

    // console.log(newUser);
    users.push(newUser);
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const user = users.find((user) => user.email === email);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    const isPassCorrect = bcrypt.compareSync(password, user.password);
    if (!isPassCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Passwords does not match!" });

    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully.", token });
  } catch (error) {
    throw new Error(error.message);
  }
};
