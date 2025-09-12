
import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import {sendEmail} from '../utils/sendEmail.js';
import bcrypt from "bcryptjs";
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
  const { name, email, password, role, phone, address, specialization, experience } = req.body;

  if(!name, !email, !password, !role, !phone, !address, !specialization, !experience){
    return res.status(400).json({msg: "fill in all fields!"});
  }

  try {
    const exist = await User.findOne({email});
    if(exist){
      return res.status(401).json({msg: "user already exist"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      hashPassword,
      role,
      phone,
      address,
      ...(role === 'vet' && { specialization, experience }),
    });

    sendEmail({
      email: user.email,
      subject: 'Welcome to FurShield!',
      message: `Hello ${user.name}, thank you for registering!`,
    });

    res.status(201).json({
      msg: "Registered Account sucessfully",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    return res.status(401).json({msg: "Invalid credetials"})
  }

  res.status(200).json({
    msg: "Loggedin sucessfully",
    token: generateToken(user._id, user.role),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    msg: "Found user",
    data: user,
  });
};