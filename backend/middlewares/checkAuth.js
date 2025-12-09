import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt; //jwt => cookie's name
  if (!token) {
    return res.status(401).send({ error: "You need to login first!!" }) //401 => unauthorised
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET); //decryption
    const user = await User.findById(_id);
    req.user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  } catch (err) {
    res.status(400).send({ message: "err.message" })
  }
  next();
}
export default checkAuth;