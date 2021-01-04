const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
const app = express();



DB_URL = 'mongodb://localhost/APIProject'
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
mongoose.connection.once('open', () => {
    console.log('Connected to database');
}).on('error', (error) => {
    console.log(`There is an error in connecting database: ${error}`);
});


//importing routes
const users = require('./routes/users');
const cars = require('./routes/cars');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/cars',cars)
app.use('/users',users)




//Catch 404 errors
app.use((req,res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//Error handler functions
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err: {};
    const status = error.status || 500;
    //responce to client 
    res.status(status).json({
        error:{
            message:error.message
        }
    });
    // respomce to ourselves
    console.log(error)
})


//Start the server
const port =  app.get('port')||3000


app.listen( port,()=>{
    console.log(`Server on port ${port}`);
});




