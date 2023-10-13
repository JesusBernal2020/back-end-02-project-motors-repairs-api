const express = require('express');

//constrollers
const userController = require('./../controllers/user.controller');

//midllewares
const userMiddleware = require('./../middlewares/user.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const loginMiddleware = require('./../middlewares/login.middleware');

const router = express.Router();

router.post('/login', userController.loginUser);

router
  .route('/')
  .get(loginMiddleware.proctect, userController.findAllUsers)
  .post(validationMiddleware.createUserValidation, userController.createUser);

router.use(loginMiddleware.proctect);

router
  // .use('/:id', userMiddleware.validUser)
  .route('/:id')
  .get(userMiddleware.validUserRelacions, userController.findOneUser)
  .patch(
    userMiddleware.validUser,
    loginMiddleware.protectAccountUser,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    loginMiddleware.protectAccountUser,
    userController.deleteUser
  );

module.exports = router;
