const { Statuscode } = require('http-status-codes');
class AppError extends Error{
    constructor(    name         = 'AppError',
                    message      = 'something went wrong',
                    explaination = 'something went wrong',
                    statuscode   =  Statuscode.INTERNAL_SERVER_ERROR )
                    {
                        super();
                    this.message = message,
                    this.explaination = explaination,
                    this.name = name,
                    this.statuscode = statuscode
  
    }
}

module.exports = AppError;