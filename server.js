const express = require('express')
const logging = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/module04-assignment', { useNewUrlParser: true })
mongoose.Promise = global.Promise
let Account = mongoose.model('Account', {
    name: String,
    balance: Number
})
const app = express()
app.use(logging('dev'))
app.use(bodyParser.json())
app.use(errorhandler())

app.get('/accounts', (req, response) => {
    Account.find({}, (error, result) => {
        if (error)
            return console.error(error)
        response.send(200, result)
    })
})
app.post('/accounts', (req, response) => {
    let newAccount = new Account(req.body)
    newAccount.save((error, result) => {
        if (error)
            return console.error(error)
        response.send(201, result)
    })
})
app.put('/accounts/:id', (req, response) => {
    let updatedAcc = new Account({
        _id: mongoose.Types.ObjectId(req.params.id),
        name: req.body.name,
        balance: req.body.balance
    })
    Account.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, updatedAcc, (error, result) => {
        if (error)
            return console.error(error)
        response.send(200, result)
    })
})
app.delete('/accounts/:id', (req, response) => {
    Account.remove({ _id: mongoose.Types.ObjectId(req.params.id) }, (error, result) => {
        if (error)
            return console.error(error)
        response.send(204)
    })
})
app.listen(3000)