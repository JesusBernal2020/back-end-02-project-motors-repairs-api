const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const { promisify } = require('util');

exports.proctect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.includes('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not login in please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('the owner if this token is not longer available', 401)
    );
  }

  req.seccionUser = user;

  next();
});

exports.protectAccountUser = (req, res, next) => {
  const { user, seccionUser } = req;

  if (user.id !== seccionUser.id) {
    return next(new AppError('You do not is acount', 401));
  }

  next(); 
};

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.seccionUser.role)) {
      return next( new AppError('you do not have permission to perfom this action', 403)
      );
    }

    next();
  };
};
