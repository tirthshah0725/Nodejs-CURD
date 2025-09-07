//Create a server

const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser')

app.use(bodyParser.json()); //req.body

app.use(express.static('public'))

const auth = require('./auth')
const passport = require('passport');

//Middleware Function
const logRequest = (req,res,next) =>
{
    console.log(`[${new Date().toLocaleDateString()}] Request Made to : ${req.originalUrl}`)
    next(); //Move on to the next phase
    
}
app.use(logRequest);

const bcrypt = require('bcryptjs');


app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false});
app.get('/',function (rep,res)
{
    res.send("Welcome")
})

//Import the router files
const personRouters = require('./routes/personRoutes');
const menuRouters = require('./routes/menuRoutes');

//Use Routers
app.use('/person',personRouters);

app.use('/menu',menuRouters);


app.listen(3000,() =>{
    console.log("3000");
})