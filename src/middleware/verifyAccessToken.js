import jwt from "jsonwebtoken";
import userSchema from "../models/mongoDB/Users.js";

export const verifyAccessToken = async (req, res, next) => {
    const header = req.headers.authorization;
    try {
    if (!header) {
      return res
        .status(401)
        .json({ success: false, message: "Not token Access" });
    }
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
      req.decoded = decoded;
      if (decoded.role !== "admin") {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
