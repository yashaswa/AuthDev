const express = require ('express')
const {AuthRequestValidators} = require('../../middleware/index');
const UserController = require('../../controller/user-controller');
const { validateUserIsAdmin } = require('../../middleware/auth-request-validators');

const router = express.Router();

router.post('/signup',
AuthRequestValidators.validateUserAuth,
UserController.create);

router.post('/signin',
AuthRequestValidators.validateUserAuth,
UserController.signIn);

router.get('/isAuthenticated',
UserController.isAuthenticated);

router.get('/isAdmin',
validateUserIsAdmin,
UserController.isAdmin);

module.exports= router;