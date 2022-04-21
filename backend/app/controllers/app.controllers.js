const db = require('../models/app.model')
const UserModel = db.userModel
const jwt_encode = require('jsonwebtoken')

const SECURE_TOKEN = 'secret1234'

exports.findAll = (request, response) => {
    console.log('>>> find all user')
    UserModel.find()
    .then((result) =>{
        response.send(result)
    })
    .catch((error) => {
        response.status(500).send({
            messsage: error.message || "Some error while retrieving user"
        })
    });
}

exports.register = async (request, response) => {
    console.log('>>> register user')
    console.log(request.body)

    try {
        await UserModel.create({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        })
        response.json({ status: 'ok' })
    } catch (err) {
        response.json({ status: 'error', error: 'Email sudah terdaftar' })
    }
}

exports.login = async (request, response) => {
    console.log('>>> login user')
    console.log(request.body)

    try {
        const data = await UserModel.findOne({
            email: request.body.email,
            password: request.body.password
        })
        if (data) {

            const token = jwt_encode.sign(
                {
                    username: data.username,
                    email: data.email,
                }, SECURE_TOKEN
            )

            return response.json({ status: 'ok', user: token})
        } else {
            return response.json({ status: 'error', user: false})
        }
    } catch (err) {
        response.json({ status: 'error', error: err.message })
    }
}

exports.update = async (request, response) => {
    console.log('>>> update logout')
    const token = request.headers['x-access-token']
    console.log(token)
    try {
        const decode = jwt_encode.verify(token, SECURE_TOKEN)

        const status = request.body.login
        const filter = {email: decode.email}
        const update = status ? {
                loginAt: request.body.loginAt,
                logoutAt: request.body.logoutAt
            } : {
                logoutAt: request.body.logoutAt
            }
        const opts = { new: true }

        console.log(status, filter, update, opts)

        await UserModel.findOneAndUpdate(filter, update, opts)

        response.json({status: 'ok'})
    } catch (err) {

        console.log(err)
        response.json({ status: 'error', error: 'invalid token'})
    }
}