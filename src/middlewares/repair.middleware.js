const Repairs = require('../models/repairs.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError(`Repair with id ${id} not found!`, 404));
  }

  req.repair = repair;
  next();
});

exports.validRepairRelacions = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
        attributes: [
          'name',
          'email',
          'role',
          'status',
          'createdAt',
          'updatedAt',
        ],
      },
    ],
  });

  if (!repair) {
    return next(new AppError(`Repair with id ${id} not found!`, 404));
  }

  req.repair = repair;
  next();
});
