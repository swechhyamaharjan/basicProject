const checkAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (isAdmin) {
    next();
  }
  else {
    res.status(403).send({ error: "You are not allowed to perform this operation." })
  }
};

export default checkAdmin;