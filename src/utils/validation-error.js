const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ValidationError extends AppError{
constructor(error){
    let explaination= [];
    let errorName = error.name;
    error.errors.forEach((err)=>{
        explaination.push(err.message);

        //inside err it is a object {there are various parameter of object }
    // one parameter is error which is a array which have many parameter such as message so
    //thats why error.error explaination.push(...)// yeh sab vid 10 auth me hai
    })
    super(
        errorName,
        'not able to validate data sent in request',
        explaination,
        StatusCodes.BAD_REQUEST,

    )
}
}
module.exports= ValidationError