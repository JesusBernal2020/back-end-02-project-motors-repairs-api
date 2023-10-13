const Repairs = require('../models/repairs.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.createRepair = catchAsync(async (req, res) => {
    const { date, userId, motorsNumber, description } = req.body;
    const repair = await Repairs.create({
      date,
      userId,
      motorsNumber,
      description,
    });

    return res.status(201).json({
      status: 'Success',
      message: 'Repair appointment created!',
      repair,
    });
});

exports.findAllRepairs = catchAsync(async (req, res) => {
    const repairs = await Repairs.findAll({
      where: {
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

    return res.status(200).json({
      status: 'success',
      message: 'repairs successfully recovered!',
      results: repairs.length,
      repairs,
    });
});

exports.findOneRepair = catchAsync(async (req, res) => {
    const { repair } = req;

    return res.status(200).json({
      status: 'success',
      message: 'repair successfully recovered!',
      repair,
    });
});

exports.updateRepair = catchAsync( async (req, res) => {
    const { repair } = req;
    const { status } = req.body;

    const updateRepair = await repair.update({ status });

    return res.status(200).json({
      status: 'success',
      message: 'Repair update succesfully!',
      updateRepair,
    });
});

exports.deleteRepair = catchAsync(async (req, res) => {
    const { repair } = req;

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair delete succesfully!',
    });
});
