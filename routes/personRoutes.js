const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAutMiddeleware,generatetoken} = require('./../jwt')

//This create code for Person
router.post('/signup',async(req,res)=>{
   try
   {
     const data = req.body //Assuming the request body contains the person data

    //Create a new person document using mongoose model
    const newperson = new Person(data);

    //save the new person to databases 
    const response = await newperson.save()
    console.log("data save")

    const payload = {
      id : response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload))

    const token = generatetoken(payload)
    console.log("Token is : ", token)
    
    res.status(200).json({response:response,token:token})
   }
   catch(err)
   {
    console.log(err)
    res.status(500).json({error:'Internal error'})
   }
})

//Login Router
router.post('/login',async(req,res) => {
  try
  {
    //Extract username and password from request body
    const {username,pasword} = req.body;

    //Find user by username
    const user = await Person.findOne({username:username})

    //If user does not exist or password does not match, return error
    if(!user || (await user.comparePassword(password)))
    {
      return res.status(401).json({error:'Invalid username or password'})
    }

    //Generate Token 
    const payload = {
      id : user.id,
      username : user.username
    }
    const token = generatetoken(payload)
    //return token as response
    res.json({token})
  }
 catch(err)
  {
    console.log(err)
    res.status(500).json({error:'Internal error'})
  }
})

//Profile router
router.get('/profile',jwtAutMiddeleware,async(req,res) => {
  try
  {
    const userdata = req.user;
    console.log("User Data : ",userdata)
    const userid = userdata.id
    const user = await Person.findById(userid)

    res.status(200).json({user})
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:'Internal error'})
  }
})

//This read code for Person
router.get('/',jwtAutMiddeleware,async(req,res)=>{
    try
    {
        const data =  await Person.find()
        console.log("data fetched")
        res.status(200).json(data)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'Internal error'})
    }
})

router.get('/:workType',async(req,res)=>{
  try
  {
    const workType = req.params.workType; //Extract work type from URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
    {
        const response = await Person.find({work:workType})
        console.log("respones fetched")
        res.status(200).json(response)
    }
    else
    {
        res.status(404).json({error:'Invalid WorkType'})
    }
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:'Internal error'})
  }
})

//This update code for Person
router.put('/:id',async(req,res)=>{
  try
  {
    const personid = req.params.id; //Extract the id from the URL parameter.
    const updatedpersondata = req.body; //Updated data form person
    const respones = await Person.findByIdAndUpdate(personid,updatedpersondata,{
      new: true, //Return the updated documet
      runValidators: true, //Run Mongooes validation
    })

    if(!respones)
    {
      return res.status(500).json({error:"Person not found"})
    }
    console.log("data Updated");
    res.status(200).json(respones);
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:'Internal error'})
  }
})

//This delete code for Person
router.delete('/:id',async(req,res)=>{
try
{
  const personid = req.params.id;
  const respones = await Person.findByIdAndDelete(personid);
  if(!respones)
    {
      return res.status(500).json({error:"Person not found"})
    }
    console.log("data Deleted");
    res.status(200).json({message:'Person Deleted Successfully'});
}
catch(err)
{
  console.log(err)
  res.status(500).json({error:'Internal error'})
}
})

//comment added for testing purposes
module.exports = router;