const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

//=============================== validation users

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is requerid'),
  body('email')
    .notEmpty()
    .withMessage('Email is requerid')
    .isEmail()
    .withMessage('Format email is incorrect'),
  body('password')
    .notEmpty()
    .withMessage('password is requirid')
    .isLength({ min: 8 })
    .withMessage('min 8 characteres is requerid'),
  validFields,
];

//======================================= validations repairs

exports.createRepairsValidation = [
  body('date').notEmpty().withMessage('Date is requerid'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('motorsNumber is requerid')
    .isLength({ max: 6 })
    .withMessage('max 6 characteres'),
  body('description').notEmpty().withMessage('description is requerid'),
  body('userId').notEmpty().withMessage('userId is requerid'),
  validFields,
];
