// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);
// fs.appendFile('greeting.txt','hi ' + user.username + '!\n',()=>
// {
//     console.log("file created");
// });
// console.log(os);
// console.log(fs);

// const notes = require('./notes.js');

// var age = notes.age;
// var r = notes.addnumber(age+18,10);
// console.log(age);
// console.log(r);

// var lodash = require('lodash');
// var data = ["pr","pr",1,2,3,1]; 
// var f = lodash.uniq(data);
// console.log(f);

// const str = '{"name": "Tirth","age":20,"city":"Ahemdabad"}';
// const obj = JSON.parse(str);
// console.log(obj.name);

// const str = {
//     name: "Tirth",
//     age:20,
//     city:"Ahemdabad"};
// const obj = JSON.stringify(str);
// console.log(obj);
// console.log(typeof obj);

//Create a server

const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.body
app.use(express.static('public'))
// const Menu = require('./models/menu');  //This code is use for serve file

//Middleware Function
c

app.get('/',function (rep,res)
{
    var t = {
        name : 'Tirth',
        age : 20,
    }
    res.send(t)
})



// //This is code for Menu for use server file
// app.post('/menu',async(req,res)=>{
//    try
//    {
//      const data1 = req.body //Assuming the request body contains the person data

//     //Create a new person document using mongoose model
//     const newmenu = new Menu(data1);

//     //save the new person to databases 
//     const response1 = await newmenu.save()
//     console.log("data save")
//     res.status(200).json(response1)
//    }
//    catch(err)
//    {
//     console.log(err)
//     res.status(500).json({error:'Internal error'})
//    }
// })

// //GET method to get the person
// app.get('/menu',async(req,res)=>{
//     try
//     {
//         const data1 =  await Menu.find()
//         console.log("data fetched")
//         res.status(200).json(data1)
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.status(500).json({error:'Internal error'})
//     }
// })

//Import the router files
const personRouters = require('./routes/personRoutes');
const menuRouters = require('./routes/menuRoutes');

//Use Routers
app.use('/person',personRouters);

app.use('/menu',menuRouters);


app.listen(3000,() =>{
    console.log("3000");
})