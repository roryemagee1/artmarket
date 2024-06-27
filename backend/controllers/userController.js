import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc Authorize user and get token
// @routes POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.")
  }
});

// @desc Register user
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

// @desc Logout user and clear cookie
// @routes POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

// @desc Get user profile
// @routes GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

// @desc Update user profile
// @routes PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

// @desc Get user profile
// @routes GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get users");
});

// @desc Get user by ID
// @routes GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

// @desc Delete user profile
// @routes DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

// @desc Update user profile
// @routes PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  getUserById, 
  deleteUser, 
  updateUser 
}