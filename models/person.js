const mongoose  = require("mongoose");

//define the person schema
const personschema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    age:
    {
        type: Number
    },
    work:
    {
        type: String,
        enum: ['chef','waiter','manager'],
        require: true
    },
    mobile:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String,
        require: true,
        unique: true
    },
    address:
    {
        type: String
    },
    salary:
    {
        type: Number,
        require: true
    },
    username:
    {
        type: String,
        require: true
    },
    password:
    {
        type: String,
        require: true
    }
});

personschema.pre('save',async function(next){
    const person = this;

    //Has the password only if it has been modified (or is new)
    if(!person.isModified('password'))
        return next();
    try
    {
        //has password genration
        const salt = await bcrypt.genSalt(10);

        //has password
        const hashedpassword = await bcrypt.hash(person.password,salt)

        //overried the plain password with the hashed one 
        person.password = hashedpassword 
        next();
    }
    catch(err)
    {
        return next(err);
    }
})

personschema.methods.comparepassword = async function(candidatepassword){
    try
    {
        //use bcrypt to commpare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatepassword,this.password);
        return isMatch
    }
    catch(err)
    {
       console.log(err)
       res.status(500).json({error:'Internal error'})
    }
}

//create person model
const person = mongoose.model('Person',personschema);
module.exports = person
