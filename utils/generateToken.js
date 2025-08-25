import jwt from "jsonwebtoken";

const createToken = (res, _id) => { //create
  const token = jwt.sign({_id}, 'mysecretjwtkey', {expiresIn: '3d'} ) //jwt sign= generate token
  res.cookie("jwt", token, { //store
    httpOnly: true,
    secure: process.env.NODE_ENV != 'development',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000 //time always must be in miliseconds
  });
};

export default createToken;