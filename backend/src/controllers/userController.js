const User = require('../models/User');

// Create a user

exports.createUser =  async (req, res) => {
 try{
   const {name, email} = req.body;
   const user = await User.create({name, email});
   res.status(201).json(user);
 }catch(error){
  res.status(500).json({
    message: error.message
  })
 }
}

// get all users

exports.getAllUsers = async (req,res)=>{
    try{
      const users = await User.find();
      res.status(200).json(users);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
