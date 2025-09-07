const jwt = require('jsonwebtoken')
 
const jwtAutMiddeleware = (req,res,next) => {

    //first check request headers has authorization or not 
    const authoization = req.headers.authoization
    if(!authoization)
    {
        return res.status(401).json({error: 'Invalid Token'}); 
    }

    //Extract to jwt token from the request headers
    const token = req.headers.authoization.split('')[1];
    if(!token)
    {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try
    {
        //Verify the jet token
        const decoded  = jwt.verify(token,process.env.JWT_SECRET);

        //Attech user infromation to the request object
        req.uset = decoded;
        next();
    }
    catch(err)
    {   
        console.log(err);
        res.status(401).json({error : 'Invalid token'});
    }
} 

//Function to generate JWT token 
const generatetoken = (userdata) => {
    //generate a new JWT token using user data
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:300000}); 
}

module.exports = {jwtAutMiddeleware,generatetoken}