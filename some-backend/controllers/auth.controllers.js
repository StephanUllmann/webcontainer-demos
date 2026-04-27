import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secure = process.env.NODE_ENV !== 'development';

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Email überprüfen
  const emailInUse = await User.exists({ email });
  if (emailInUse) {
    // throw new Error("Go to login", 200)
    throw new Error('Email already in use', { cause: 409 });
  }

  // Passwort absichern
  const salt = await bcrypt.genSalt(13);
  const hashedPW = await bcrypt.hash(password, salt);

  // User speichern
  const user = (
    await User.create({ ...req.body, password: hashedPW })
  ).toObject();
  delete user.password;

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    expires: new Date(
      Date.now() + Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    ),
  });

  res.json({ msg: 'Registered', data: user });
};

const login = async (req, res) => {
  // Finde User in DB
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password').lean();
  if (!user) {
    throw new Error('Invalid credentials', { cause: 401 });
  }

  // Vergleiche PWs
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials', { cause: 401 });
  }

  // JWT
  delete user.password;

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    expires: new Date(
      Date.now() + Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    ),
  });

  res.json({ msg: 'Logged in', data: user });
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
  });
  res.json({ msg: 'Logout successful' });
};

const me = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).lean();
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

export { registerUser, login, logout, me };
