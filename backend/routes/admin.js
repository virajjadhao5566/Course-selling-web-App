const mongoose = require('mongoose')
const express = require('express')
const { User, Admin, Course } = require("../db")
const jwt = require('jsonwebtoken')
const { SECRET } = require("../middlewares/auth")
const { authJWT } = require("../middlewares/auth")

const router = express.Router()
let generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

router.get("/me", authJWT, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" })
        return
    }
    res.json({
        username: admin.username
    })
});

router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body
    let admin = await Admin.findOne({ username })
    if (admin) {
        res.status(403).json({ message: "Username already exists" })
    } else {
        const obj = { username, password }
        const newAdmin = new Admin(obj)
        newAdmin.save()
        let payload = { username, role: 'admin' }
        const token = generateToken(payload)
        res.json({ message: "Admin created succesfully", token })
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers
    let admin = await Admin.findOne({ username, password })
    if (admin) {
        let payload = { username, role: 'admin' }
        let token = generateToken(payload)
        res.json({ message: "Logged In succesfully", token })
    } else {
        res.status(404).json({ message: "Admin not found" })
    }
});

router.post('/courses', authJWT, async (req, res) => {
    // logic to create a course
    const course = req.body
    let newCourse = new Course(course)
    await newCourse.save()
    res.json({ message: "Course creaed succesfully", courseId: course.id })
});

router.put('/courses/:courseId', authJWT, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.get('/admin/courses', authJWT, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({})
    res.json({ courses })
});

router.get('/course/:courseId', authJWT, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});

module.exports = router
