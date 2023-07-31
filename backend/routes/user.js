const express = require('express')
const { authJWT, SECRET } = require("../middlewares/auth")
const { User, Course, Admin } = require("../db");
const { model } = require('mongoose');

const router = express.Router()
let generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

router.post('/signup', async (req, res) => {
    // logic to sign up user
    let { username, password } = req.body
    let user = await User.findOne({ username })
    if (!user) {
        let obj = { username, password }
        let newUser = new User(obj)
        newUser.save()
        let payload = { username, role: "user" }
        let token = generateToken(payload)
        res.json({ message: "User created successfully", token })
    } else {
        res.json({ message: "User already exists" })
    }
});

router.post('/login', async (req, res) => {
    // logic to log in user
    let { username, password } = req.headers
    let user = await User.findOne({ username })
    if (user) {
        let payload = { username, role: 'user' }
        let token = generateToken(payload)
        res.json({ message: "LoggedIn Succesfully" })
    } else {
        res.status(404).json({ message: "User doesnt exist" })
    }
});

router.get('/courses', authJWT, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true })
    res.json({ courses })
});

router.post('/courses/:courseId', authJWT, async (req, res) => {
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId)
    if (course) {
        const user = await User.findOne({ username: req.user.username })
        if (user) {
            user.purchasedCourses.push(course)
            await user.save()
            res.json({ message: "Course purchased Succesfully" })
        } else {
            res.status(403).json({ message: "User not found" })
        }
    } else {
        res.status(404).json({ message: "Course not found" })
    }
});

router.get('/purchasedCourses', authJWT, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses')
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] })
    } else {
        res.status(403).json({ message: 'User not found' })
    }
});

module.exports = router
