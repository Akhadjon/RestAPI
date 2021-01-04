const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    
   make:String,
   model:String,
   year:Number,
   seller:{
       type:Schema.Types.ObjectId,
       ref:'user'
   }
});

const Car = mongoose.model('car',carSchema)
module.exports = Car