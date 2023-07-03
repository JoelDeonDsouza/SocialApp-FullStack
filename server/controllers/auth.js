import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import _ from "lodash";

// * New user *//
export const register = async (req, res) => {
  try {
    const { name, email, password, picturePath, friends, location } = req.body;
    // Password Hash //
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Create new user account //
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// User Authentication login function //
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECREAT_BASE_JWT_STRING;
  if (!user) {
    return res.status(400).send("Eamil not found");
  }
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // Removed password //
    const userWithoutPassword = _.omit(user.toObject(), "password");

    const token = jwt.sign(
      {
        userId: user.Id,
      },
      secret,
      { expiresIn: "1w" }
    );
    // !added user data while login //
    res.status(200).send({ token, user: userWithoutPassword });
  } else {
    res.status(400).send("Authentication Failed Wrong password");
  }
};
