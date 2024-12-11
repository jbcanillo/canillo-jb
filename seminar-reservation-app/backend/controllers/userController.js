import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/email.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const createUser = async (req, res) => {
  try {
    // const user = await User.create(req.body);
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const sendPassword = async (req, res) => {
  const { email, password } = req.body; // Get email and password from the request
  const subject = "Your New Account Password";
  const text = `Hello,\n\nYour account has been created. Your password is: ${password}\n\nPlease change your password after logging in.`;
  const html = `<p>Hello,</p><p>Your account has been created. Your password is: <strong>${password}</strong></p><p>Please change your password after logging in.</p>`;
  try {
    // Use the sendEmail utility to send the email
    await sendEmail(email, subject, text, html);
    res.status(200).send("Password sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

export { getUsers, createUser, sendPassword, getProfile, updateProfile };
