const  UserRepository  = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const {JWT_KEY  } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
constructor(){
    this.userRepository = new UserRepository();
}
async create(data){

    try {
        const user = await this.userRepository.create(data);
        return user;
    } catch (error) {
        console.log("something went wrong in service layer ");
        throw error;
    }
}

    async signIn(email,plainPassword){
        try {
            
            const user = await this.userRepository.getByEmail(email); // fetch the user using email
            const passwordsMatch =  this.checkPassword(plainPassword,user.password);//compare plain and encrypted passwords
            if(!passwordsMatch){
                console.log("password doesn't match");
                throw {error : 'incorrect password'}
            }

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
            
        } catch (error) {
            console.log("something went wrong in signIn");
            throw error;
        }
    }

 createToken(user){
    try {
        const result = jwt.sign(user ,JWT_KEY,{expiresIn: '1h'});
        return result;
    } catch (error) {
        console.log("something went wrong in token creation");
        throw error;
    }
}

verifyToken(token) {
    try {
        const response = jwt.verify(token, JWT_KEY);
        return response;
    } catch (error) {
        console.log("something went wrong in token validation",error);
        throw error;
    }
}

     checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
            
        } catch (error) {
            console.log("something went wrong in password comparison");
        throw error;
        }
     }

     async isAuthenticated(token){
        try {
           const response = this.verifyToken(token);
           if(!response){
            throw{erorr: 'invalid token'}
           }
           const user = this.userRepository.getByID(response.id);
           if(!user){
            throw {error : 'no user with corrosponding id exists'}
           }
           return user.id;
        } catch (error) {
            console.log("something went wrong in auth");
            throw error;
        }
     }

}
module.exports = UserService;