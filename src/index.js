const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const UserService = require('./services/user-service');


const apiRoutes = require('./routes/index')


const {PORT} = require('./config/serverConfig');

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

app.use('/api' ,apiRoutes);

app.listen(PORT , async () => {
console.log(`server started at ${PORT} `);

// const service = new UserService();
// const newToken = service.createToken({
//     email: 'yashaswa@admin.com',
//     userId: '4',
    
// })
// console.log("new token is ", newToken); 

// const token = ""

// const response =service.verifyToken(token);
// console.log(response);
 });
}
prepareAndStartServer();