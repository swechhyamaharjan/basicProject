import User from "../models/user.js"
import createToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User already exist!" });
  }
  const newUser = await User.create({
    fullname,
    email,
    password,
    isAdmin
  });
  res.send({
    message: "User created successfully",
    user: {
      fullname: newUser.fullname,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  if (await user.matchedPassword(password)) {
    createToken(res, user._id);
    res.send({
      message: "Login Success",
      user: {
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    })
  }
  else{
    return res.status(404).send({error: "Password not matched!"})
  }
}
const logout = async(req, res) => {
  if(req.user){
    res.clearCookie('jwt');
    res.send({message: "Logout success!"})
  }
  else{
    res.status(400).send({error: "You are not logged in!"})
  }
}

export { signup, login, logout};