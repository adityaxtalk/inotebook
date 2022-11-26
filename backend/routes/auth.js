const express=require('express');
const User = require('../models/Users')
const router= express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='Aditya@bct';

const {body, validationResult} = require('express-validator')

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5})
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    let success=false;
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    try {
      // Check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success ,error: "Sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const securePassword=await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      });
      const data={
        user: {
            id: user.id
        }
      }
      success=true;
      const authToken=jwt.sign(data, JWT_SECRET);
      res.json({success,authToken}); 
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured');
    }
    

});

// Authenticate a User usling: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be blank').exists()
], async (req, res)=>{
    // If there are errors, return bad request and the errors.
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} =req.body;
    try {
        let user=await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({error: 'Please enter a valid credentials'});
        }
        let success=true;
        const passwordCompare= await bcrypt.compare(password, user.password);
        console.log(passwordCompare)
        if (!passwordCompare) {
            success= false;
            return res.status(400).json({success, error: 'Please enter valid credentials'});
        } 
        const data= {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken});
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured');

    }
})

// Get loggedIn User Details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser,async (req, res)=>{
    try {
       const userId=req.user.id;
       const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message)
    }
})
module.exports=router; 