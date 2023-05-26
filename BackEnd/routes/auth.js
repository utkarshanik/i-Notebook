const express= require('express');
const router= express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser')

const JWT_Secret='iamgoodatit'; //this is used to sign web token 

// In this end-Poind

//Route 1: Create a User using: POST "/api/auth/createUser" , Doesnt require Auth (login)
    //'post' is > secure 'get' as it send data in message type instead of appending it in URL string 
router.post('/createUser',[
   body('name','Enter a Valid Name').isLength({ min: 3 }),   
   body('email','Enter a Valid Password').isEmail(),
   body('password','Wrong Password').isLength({ min: 5 }),
  ], async(req,res)=>{
// If there are errors, return bad request
let success=false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Checks whether email exist already
    try{
    let user= await User.findOne({email:req.body.email});
    if(user){
         return res.status(400).json({success,error:"Sorry User Aleady Existed"});
    }
    const salt= await bcrypt.genSalt(10);
    const seqPas= await bcrypt.hash(req.body.password,salt) 
    //new user creation
   user= await User.create({
        name: req.body.name,
        password:seqPas,
        email: req.body.email,
      })
      
      // .then(user => res.json(user))
      //  .catch(err=>{console.log(err)
      //  res.json({error:'please eneter a unique value'})})
    
      const data={
        user:{
              id:user.id
        }
        }

      const jwtData = jwt.sign(data,JWT_Secret);
      // console.log(jwtData);
      success=true;
      res.json({success,jwtData})
      // res.json({user})
    }
    catch(error)
    {
       console.error(error.message);
       res.status(500).send("Some Error Occured");
    }
})

//Route 2: Authithicate a user //Create a User using: POST "/api/auth/login" , Doesnt require Auth (login)
router.post('/login',[
  body('email','Enter a Valid Password').isEmail(),
  body('password','Enter a proper Password').exists(),
   ], async(req,res)=>
   
   {
    let success=false;
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}= req.body;

    try{
      let user=await User.findOne({email});
      if(!user)
      {
        success=fasle;
        return res.status(400).json({success,error:"Try with right credentials"});
      }
      const comparePassword=await bcrypt.compare(password, user.password);
      if(!comparePassword)
      {
        success=fasle;
        return res.status(400).json({success,error:"Try with right credentials"});
      }
  
      const data={
        user:{
              id:user.id
        }
        }
      const jwtData = jwt.sign(data,JWT_Secret);
      success=true;
      res.json({success,jwtData})

      }    
    
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error occured");

    }
  })

//Route 3: Get Loggin user details  using: POST "/api/auth/getuser" , require Auth (login)
router.post('/getuser',fetchuser, async(req,res)=>{
  try{
       userId= req.user.id;
       const user= await User.findById(userId).select("-password")
       res.send(user);
     }
  catch(error)
  {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
})

module.exports= router 

  //plain tex cantbe usedd to store the password as it can be hacked easily soo
// Hash is one way fuction to secure password it gentraes number of bit which are same in length
// one wayy  means it cant be reversed i.e we cant get password from hash value
// "Rainbow--Table"{ table of password and its hash value(generarly for weak password)} can be used by hacker to tackle this issue
// salt andd paper are used to make password more secure by adding some string to original password in backend =>hash value
// node gives us the package called "bcryptjs"

//jsonwebtooken is way to verify the  user
//JWT has "3 parts" first algorithm & token type , data which are getting send(PayLoad), imp signature
//so user logins & we will sign WT by above signature and next time will verify the tokenn using signature
