import userSchema from "../models/mongoDB/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthController = {
  // Register a new user
  async register(req, res) {
    try {
      const { name, email, role } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = new userSchema({ name, email, password, role });
      if (!newUser) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid data" });
      }
      await newUser.save();
      res.status(201).json({ success: true, message: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Login a user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong password" });
      }
      const userForToken = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(userForToken, process.env.jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).json({
        success: true,
        message: "User login and crated token",
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Logout a user
  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout" });
  },

  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await userSchema.find();
      if (users.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No users found" });
      }
      res.status(200).json({ success: true, message: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // get user by name
  async getUserByName(req, res) {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a user name" });
    }
    try {
      const user = await userSchema.find({
        name: { $regex: name, $options: "i" },
      });
      console.log(user);
      if (user.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // delete user by id
  async deleteUserById(req, res) {
    try {
      const user = await userSchema.findByIdAndDelete(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // update user by id
  async updateUserById(req, res) {
    try {
      const user = await userSchema.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }
      if (req.body.role) {
        user.role = req.body.role;
      }
      const updateUser = await user.save();
      res.status(200).json({ success: true, message: "User updated", updateUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default AuthController;
