const router = require('express-promise-router')();
const carsController = require('../controllers/cars')


router.route('/')
  .get(carsController.index)
  .post(carsController.newCar)

router.route('/:carId')
  .get(carsController.getCar)
  .put(carsController.replaceCar)
  .patch(carsController.updateCar)
  .delete(carsController.deleteCar)

module.exports = router