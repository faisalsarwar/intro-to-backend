import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    // check if user  exisits already
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    // returning the status when user registered
    res.status(201).json({
      message: "User registered",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    console.log("Error accure", error);
  }
};

const loginUser = async (req, res) => {
  try {
    //checking if the user already exisits
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    //compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    res.status(200).json({
      message: "User logged In",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    // checking the user email
    const user = await User.findOne({
      email,
    });

    // if we dont fount the user email we will return an message
    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error", error
    });
  }
};

export { registerUser, loginUser, logoutUser };
