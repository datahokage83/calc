module.exports = (app) => {
    const user = require('../controllers/app.controllers')
    const router = require('express').Router()

    router.get('/users', user.findAll)
    router.post('/register', user.register)
    router.post('/login', user.login)
    router.post('/user', user.update)

    app.use('/api', router)
}