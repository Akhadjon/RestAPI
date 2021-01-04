const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/users')
const {validateParam,schemas} = require('../helpers/routehelpers')


router.route('/')
 .get(usersController.index)
 .post(usersController.newUser)

router.route('/:userId')
  .get(usersController.getUser)
  .put(usersController.replaceUser)
  .patch(usersController.updateUser)
  

router.route('/:userId/cars')
  .get(usersController.getUserCars)
  .post(usersController.newUserCar)


 module.exports = router;