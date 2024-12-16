const express = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Route = express.Router();

Route.post("/login", async (req, res) => {
  try {
    const body = req.body;

    if (!body.email || !body.password) {
      return res.status(400).json({
        isSuccessful: false,
        error: "Email or Password is missing",
      });
    }

    const existingUser = await UserModel.findOne({ email: body.email });

    if (existingUser) {
      const passwordMatched = await bcrypt.compare(
        body.password,
        existingUser.password
      );

      if (passwordMatched) {
        const token = jwt.sign({ ...existingUser }, "abcdefgh123456789");
        res.status(200).json({
          isSuccessful: true,
          message: "Logged In Successfully",
          data: {
            user: existingUser,
            token,
          },
        });
      } else {
        res.status(401).json({
          isSuccessful: false,
          error: "Wrong Password",
        });
      }
    } else {
      res.status(404).json({
        isSuccessful: false,
        error: "User not found with this email",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

Route.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    if (!body.email || !body.password || !body.userName) {
      return res.status(400).json({
        isSuccessful: false,
        error: "Required fields are missing",
      });
    }

    if (!body.userName.trim()) {
      return res.status(400).json({
        isSuccessful: false,
        error: "Username cannot be empty",
      });
    }

    const existingUser = await UserModel.findOne({ email: body.email });

    if (existingUser) {
      res.status(400).json({
        isSuccessful: false,
        error: "User already exists with this email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const userObj = {
        userName: body.userName,
        email: body.email,
        password: hashedPassword,
      };

      const newUser = new UserModel(userObj);
      await newUser.save();

      res.status(201).json({
        isSuccessful: true,
        message: "User Signup Successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

module.exports = Route;
