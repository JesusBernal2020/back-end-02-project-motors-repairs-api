const catchAsync = require('../utils/catchAsync');
const User = require('./../models/users.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');
const Repairs = require('../models/repairs.model');
const { where } = require('sequelize');

//crear un usuario
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encrytedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encrytedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'Success',
    message: 'the user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

//traer todos los usuarios
exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'status',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: Repairs,
        where: {
          status: ['pending', 'completed'],
        },
        attributes: {
          exclude: ['userId'],
        },
      },
    ],
  });
  return res.status(200).json({
    status: 'Success',
    message: 'User retrived successfully!',
    results: users.length,
    users,
  });
});

// traer usuario por su id
exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    message: 'User retrived successfully!',
    user,
  });
});

//actualizar usuario por su id
exports.updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;


  const updateUser = await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'Success',
    message: 'User Update Successfully!!',
    updateUser,
  });
});

//eliminar un usuario por su id
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'unavailable' });

  return res.status(200).json({
    status: 'Success',
    message: 'User deleted susceesfully!',
  });
});

exports.loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`User with email ${email} not found`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email in password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    message: 'the user is has been login',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
