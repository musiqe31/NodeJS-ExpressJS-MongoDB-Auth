var express = require('express');
var router = express.Router();
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


//GET ALL USERS
router.get('/', async (req, res)=>{
try {
    const users = await User.find();
    res.send(users)
} catch (error) {
    
}
})

/* Register. */
router.post('/register', async (req, res)=> {

    //Validating data from user
const {error} = registerValidation(req.body)
if(error){
    return res.status(400).send(error.details[0].message)
}

//Checking to see if email already exists
const emailexists = await User.findOne({ email:req.body.email })

if(emailexists){
    return res.status(400).send("Email Already Exists")
}


//Hash password
//salt generates a random string
const salt = await bcrypt.genSalt(10)
const hashpassword = await bcrypt.hash(req.body.password, salt);




//Create new user
      const user = new User({
          name:req.body.name,
          email: req.body.email,
          password:hashpassword
      })

      const savedUser = await user.save();
      res.send(savedUser)

});


//Login
router.post('/login', async (req, res) =>{
    //Validating login
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    //Checking to see if email already exists
    const user = await User.findOne({ email:req.body.email })

    if(!user){
    return res.status(400).send("Please Re-Enter Credentials")
}

    //Check if passwword is correct
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if(!validpass){
        res.status(400).send("Invalid Username or Password")
    }


    //Create and assign Json Web Token
    const token = jwt.sign({_id:user._id}, process.env.TOKENSECRET)
    res.header('auth-token', token).send(token);
});

module.exports = router;
