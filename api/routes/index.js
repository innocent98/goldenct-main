const router = require('express').Router()

const authRoute = require('./auth')
const adminRoute = require('./admin')
const userRoute = require('./user')
const mineRoute = require('./mine')
const taskRoute = require('./task')

router.use('/api/auth', authRoute)
router.use('/api/admin', adminRoute)
router.use('/api/user', userRoute)
router.use('/api/mine', mineRoute)
router.use('/api/task', taskRoute)

module.exports = router
