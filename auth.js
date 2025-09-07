const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/person');

passport.use(new LocalStrategy(async (username,password,done) => {
    //authentiction logic here 
    try
    {
        // console.log("Recived credentials :",username,password)
        const user = await Person.findOne({username : username});
        if(!user)
            return done(null,false,{message:'Incorrect Username.'})

        const isPasswordMatch = await user.comparepassword(password);
        if(isPasswordMatch)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false,{message:'Incorrect Password.'})
        }
    }
    catch(err)
    {
        return done(err);
    }
}))