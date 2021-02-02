const { ifError } = require('assert')
const { Console } = require('console')
// Import iniziali
const express = require('express')
const { request } = require('http')
const router = express.Router()
const bcrypt = require('bcrypt')
// Import del Json Web Token
const jwt = require('jsonwebtoken')
const fs = require('fs')
// Import di mongoose per connettersi al db
const mongoose = require('mongoose')

// Import del modello di mongoose
const User = require('../models/users') // il comando ../ è one folder up

const db = 'mongodb+srv://admin:admin@crestionaledb.qcw4s.mongodb.net/crestionaleDB?retryWrites=true&w=majority'

/*
* Funzione per la connessione al db, dove il primo argomento è la stringa db creata e il secondo è
* una funzione di callback che restituirà un errore se c'è stato un errore in connessione. Se è così,
* if(err), stampo l'errore, altrimenti confermo l'avvenuta connessione.
*/
mongoose.connect(db, err => {
    if(err) {
        console.log('Error: ' + err)
    }
    else {
        console.log('Connected to MongoDB')
    }
})

// Risposta che verrà mostrata quando accedo a localhost:3000/api
router.get('/', (req, res) => {
    res.send('From API route')
})

/* 
* Callback per accedere alla richieste e alla risposta
* nel corpo della funzione, il primo step è quello di estrarre le informazioni dell'utente
* dal corpo della richiesta
*/
router.post('/register', (req, res) => {
    
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hash,
                role: req.body.role
            })

            /*
            * Per salvare i dati nel db. Come callback, questo metodo dà un errore.
            * Se c'è un errore, assegno a false un boolean chiamato status che andrò a ritornare
            * come risposta, in modo da poter gestire i messaggi di popup di errore lato client.
            */ 
            user.save((error) => {
                if(error) {
                    res.json({
                        status: false
                    })
                }
                else 
                    res.json({
                        status: true
                    })
            })  
        })    
})

// Richiesta di login, simile a quella di registrazione
router.post('/login', (req, res) => { 
    let userData = req.body

    // Dobbiamo controllare se i dati dell'utente esistono nel database
    User.findOne({ email: userData.email }).then(user => {
        // Se non trova l'utente
        if(!user) 
            throw new Error('Auth failed')
        return bcrypt.compare(userData.password, user.password)
    })
    .then(result => {
        if(!result)
            throw new Error('Auth failed')
        
        const token = jwt.sign(
            {email: userData.email}, // metto anche l'id per recuperarlo nella prossima route
            'thats_the_secret_key', 
            {expiresIn: '1h'})
        
        res.status(200).json({
            token: token,
            email: userData.email,
            expiresIn: 3600 // in secondi, tempo in cui il token scade
        })
    })
    .catch(err => {
        return res.status(401).json({message: 'Auth failed: something went wrong'})
    })  

})


module.exports = router