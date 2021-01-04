const User = require('../models/user');
const Car = require('../models/car');


module.exports = {
     index:async(req,res,next)=>{
         //get all the cars !
         const cars = await Car.find({})
         res.status(200).json(cars)
     },
     newCar:async(req,res,next)=>{
         const seller = await User.findById(req.body.seller)
         const newCar = req.body
         delete newCar.seller
         const car = new Car(newCar)
         car.seller = seller
         await car.save()
         seller.cars.push(car)
         await seller.save()
         res.status(200).json(car)
     },

     getCar:async(req,res,next)=>{
         const car = await Car.findById(req.params.carId)
         res.status(200).json(car)
     },

     replaceCar:async(req,res,next)=>{
         const {carId} = req.params
         const newCar = req.body
         const result = await Car.findOneAndUpdate(carId, newCar)
         res.status(200).json({success:true})
     },

     updateCar:async(req,res,next)=>{
        const {carId} = req.params
        const newCar = req.body
        const result = await Car.findOneAndUpdate(carId, newCar)
        res.status(200).json({success:true})
     },

     deleteCar:async(req,res,next)=>{
        const {carId} = req.params
        const car = await Car.findById(carId)
        if(!car){
           return res.status(404).json({
                error:'car doesnot exist'
            })
        }
        const sellerId = car.seller
        const seller = await User.findById(sellerId)
        await car.remove();
        seller.cars.pull(car);
        await seller.save()
        res.status(200).json({success:true});
    
     }

}