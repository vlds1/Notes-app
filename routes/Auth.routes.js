const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')

const router = Router()

// /api/auth/register
router.post('/register',
[
    check('email', 'invalid email').isEmail().normalizeEmail(),
    check('password', 'invalid password').isLength({ min: 6 })
],
async (req, res) => {
    try {
        const { email, password } = req.body

        const candidate = await User.findOne({ email })
        if(candidate){
            return res.status(401).json({ message: "user exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ email, password: hashedPassword})
        await user.save()

        return res.status(201).json({ message: "User has been created" })
    } catch (error) {
        return res.status(400).json({ message: "Register router is wrong" })
    }
})

// /api/auth/login
router.post('/login',
[
    check('email', 'invalid email').isEmail(),
    check('password', 'invalid password').exists()
],
async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'incorrect data with login'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message:"User has not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message:"Passwords doesnt compare" })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn:'2 days' }
        )
        
        return res.json({ token, userId: user.id })
    } catch (error) {
        res.status(500).json({ message:"Login route is wrong" })
    }
})

module.exports = router