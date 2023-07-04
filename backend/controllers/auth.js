import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export default class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        console.log("Login successful");
        return res.status(200).json({ token, user });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
