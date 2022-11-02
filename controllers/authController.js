import User from '../models/userModel.js';
import bcrypt from "bcrypt"

export const registerController = async(req, res) => {
// const useData= req.body;
console.log(req.body);

// I will search my DB eiher use is already registered or not

const {name, email, password} = req.body;
const foundUser = await User.findOne({email:email})

// if user is already registered with same email,throw error
if(foundUser)
    return res.status(400).json({status:"failed", message:"User already registered with this email"});


 // Hash the password before saving on database

 const saltRound = 10
 const salt = await bcrypt.genSalt(saltRound)
 const hashedPassword = await bcrypt.hash(password, salt)

 req.body.password = hashedPassword
    const user = new User(req.body);
    const savedUser = await user.save()
  res.status(200).json({status:"success", message:"User registered successfully"});
}

export const signinController = async(req, res) => {
  console.log(req.body)
  const  {email, password} = req.body
  
  const currentUser = await User.findOne({email})
  if(!currentUser) return res.status(400).json({status: "failed", message: "Invalid Credentials"})

  const verified = await bcrypt.compare(password, currentUser.password)

  if(!verified) return res.status(400).json({status: "failed", message: "Invalid Credentials"})
  res.status(200).json({status: "success", data: {email : currentUser.email, name: currentUser.name}})
}
