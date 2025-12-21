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

const getUserProfile = async(req, res)=>{
  res.send(req.user);
}

const updateProfile = async(req, res)=>{
  const user = await User.findById(req.user._id);
  if(!user) return res.status(404).send({error: "User Not Found!!"})

  user.fullname = req.body.fullname || user.fullname  //body ma kei aako chaina bhani back to j cha tei
  user.email = req.body.email || user.email

  if(req.body.password){
    user.password = req.body.password //because we have hashed the password //rehash garcha directly garda
  }
  const updatedUser = await user.save();
  res.send({
    message: "Profile Updated",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
    },
  })
};

export { signup, login, logout, getUserProfile, updateProfile};