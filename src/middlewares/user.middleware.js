const Repairs = require('../models/repairs.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`User wiht id ${id} not found!`, 404));
  }

  req.user = user;
  next();
});

exports.validUserRelacions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
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

  if (!user) {
    return next(new AppError(`User wiht id ${id} not found!`, 404));
  }

  req.user = user;
  next();
});
