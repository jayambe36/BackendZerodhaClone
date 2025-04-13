const UsersModel = require("../models/UsersModel.js");
const { createSecretToken } = require("../SecreteToken.js");


module.exports.Signup = async (req, res, next) => {
  try {
    const { fullName,email, password} = req.body;
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user =  await UsersModel.create({ fullName,email, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Signed up successfully", success: true, token, user });
    next();
  } catch (error) {
    console.error(error);
  }
};