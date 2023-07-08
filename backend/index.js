const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express();

app.use(express.json());

const SECRET = "ViR@7"

const userSchema = new mongoose.Schema({
  username:String,
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
})

const adminSchema = new mongoose.Schema({
  username:String,
  password:String
})

const courseSchema = new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  imageLink:String,
  published:Boolean
})

const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin',adminSchema)
const Course = mongoose.model('Course',courseSchema)

// jwt function
let generateToken = (payload) =>{
  return jwt.sign(payload,SECRET,{expiresIn:'1h'})
}

let authJWT = (req,res,next) =>{
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token,SECRET,(err,user)=>{
      if(err){
        return res.sendStatus(402)
      }
      req.user = user
      next()
    })
  }else{
    res.sendStatus(401)
  }
}

mongoose.connect('mongodb+srv://virajjadhao85:Vir%40j12345@cluster0.hewrcpu.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true});

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const {username,password} = req.body
  let admin = await Admin.findOne({username})
  if(admin){
    res.status(403).json({message:"Username already exists"})
  }else{
    const obj = {username,password}
    const newAdmin = new Admin(obj)
    newAdmin.save()
    let payload = {username,role:'admin'}
    const token = generateToken(payload)
    res.json({message:"Admin created succesfully",token})
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const {username,password} = req.headers
  let admin = await Admin.findOne({username,password})
  if(admin){
    let payload = {username,role:'admin'}
    let token = generateToken(payload)
    res.json({message:"Logged In succesfully",token})
  }else{
    res.status(404).json({message:"Admin not found"})
  }
});

app.post('/admin/courses',authJWT, async (req, res) => {
  // logic to create a course
  const course = req.body
  let newCourse = new Course(course)
  await newCourse.save()
  res.json({message:"Course creaed succesfully",courseId:course.id})
});

app.put('/admin/courses/:courseId', authJWT, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authJWT , async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({})
  res.json({courses})
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  let {username,password} = req.body
  let user = await User.findOne({username})
  if(!user){
    let obj = {username,password}
    let newUser = new User(obj)
    newUser.save()
    let payload = {username,role:"user"}
    let token = generateToken(payload)
    res.json({message:"User created successfully",token})
  }else{
    res.json({message:"User already exists"})
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  let {username,password} = req.headers
  let user = await User.findOne({username})
  if(user){
    let payload = {username,role:'user'}
    let token = generateToken(payload)
    res.json({message:"LoggedIn Succesfully"})
  }else{
    res.status(404).json({message:"User doesnt exist"})
  }
});

app.get('/users/courses',authJWT, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published:true})
  res.json({courses})
});

app.post('/users/courses/:courseId',authJWT, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId)
  if(course){
    const user = await User.findOne({username : req.user.username})
    if(user){
      user.purchasedCourses.push(course)
      await user.save()
      res.json({message:"Course purchased Succesfully"})
    }else{
      res.status(403).json({message:"User not found"})
    }
  }else{
    res.status(404).json({message:"Course not found"})
  }
});

app.get('/users/purchasedCourses', authJWT, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses')
  if(user){
    res.json({purchasedCourses:user.purchasedCourses || []})
  }else{
    res.status(403).json({message:'User not found'})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});