const  UserService  = require('../services/user-service');
const {response} = require('express');

const userService = new UserService();

const create = async (req , res) =>{
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        })
        return res.status(201).json({
            success: true,
            message : 'successfully created a new user',
            data : response,
            err: {}
        })
    } catch (error) {
        return res.status(error.statuscode).json({
            message:  error.message,
            data : {},
            success : false,
            err: error.explaination
        })
    }
}
const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email , req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'successfully signed in',
            err : {}
        })
    } catch (error) {
        
        console.log("CONTROLLER" ,error);
       
        return res.status(error.statuscode).json({
            message:  error.message,
            data : {},
            success : false,
            err: error.explaination
        })
    }
}
const isAuthenticated = async(req , res)=> {

    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'User is authenticated and token is valid',
            err : {}
        })
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong ',
            data : {},
            success : false,
            err: error
        })
    }
}

const isAdmin = async (req,res) =>{
    try{
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
        data : response,
        success : true ,
        message : 'successfully fetched whether user is admin or not',
        err:{}
    })
    }
    catch(error){
        return res.status(500).json({
            data :{},
            err: error,
            success: false,
            message : 'something went wrong in controller'
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}