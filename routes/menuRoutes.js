const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

//This create code for Menu
router.post('/',async(req,res)=>{
   try
   {
     const data1 = req.body //Assuming the request body contains the menu data

    //Create a new Menu document using mongoose model
    const newmenu = new Menu(data1);

    //save the new menu to databases 
    const response1 = await newmenu.save()
    console.log("data save")
    res.status(200).json(response1)
   }
   catch(err)
   {
    console.log(err)
    res.status(500).json({error:'Internal error'})
   }
})

////This read code for Menu
router.get('/',async(req,res)=>{
    try
    {
        const data1 =  await Menu.find()
        console.log("data fetched")
        res.status(200).json(data1)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'Internal error'})
    }
})

router.get('/:tastetype',async(req,res)=>{
  try
  {
    const tastetype = req.params.tastetype; //Extract taste type from URL parameter
    if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour')
    {
        const response = await Menu.find({taste:tastetype})
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

//This update code for Menu
router.put('/:id',async(req,res)=>{
  try
  {
    const menuid = req.params.id; //Extract the id from the URL parameter.
    const updatedmenudata = req.body; //Updated data form menu
    const respones = await Menu.findByIdAndUpdate(menuid,updatedmenudata,{
      new: true, //Return the updated documet
      runValidators: true, //Run Mongooes validation
    })

    if(!respones)
    {
      return res.status(500).json({error:"Menu not found"})
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

//This delete code for Menu
router.delete('/:id',async(req,res)=>{
try
{
  const menuid = req.params.id;
  const respones = await Menu.findByIdAndDelete(menuid);
  if(!respones)
    {
      return res.status(500).json({error:"Menu not found"})
    }
    console.log("data Deleted");
    res.status(200).json({message:'Menu data Deleted Successfully'});
}
catch(err)
{
  console.log(err)
  res.status(500).json({error:'Internal error'})
}
})

module.exports = router;
