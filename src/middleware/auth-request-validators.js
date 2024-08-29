const validateUserAuth = (req,res,next)=>{
    if(!req.body.email|| !req.body.password){
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            data : {},
            err : 'email or password missing in the request'
            
        })
    }
    next();
}

const validateUserIsAdmin = (req,res,next) =>{
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            err: 'user id is not given',
            data: {}
        })
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateUserIsAdmin
}