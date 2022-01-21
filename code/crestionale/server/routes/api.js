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
const Event = require('../models/events')
const Child = require('../models/child')

const db = 'mongodb+srv://admin:admin@crestionaledb.qcw4s.mongodb.net/crestionaleDB?retryWrites=true&w=majority'

/*
* Funzione per la connessione al db, dove il primo argomento è la stringa db creata e il secondo è
* una funzione di callback che restituirà un errore se c'è stato un errore in connessione. Se è così,
* if(err), stampo l'errore, altrimenti confermo l'avvenuta connessione.
*/
mongoose.connect(db, {useNewUrlParser: true}, err => {
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
            throw new Error('User not exists')
        return bcrypt.compare(userData.password, user.password)
    })
    .then(result => {
        if(!result)
            throw new Error('Password wrong')
        
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
        return res.status(401).json({message: err.message})
    })  

})

router.post('/createchild', (req, res) => {

    let childData = req.body
    
    User.findOne({email: childData.coordinatedBy}).then(user => {
        if(!user) 
            res.json({
                message: 'Errore: non esiste un animatore con questa mail',
            })
        else {
            const child = new Child({
                name: childData.name,
                surname: childData.surname,
                coordinatedBy: childData.coordinatedBy,
                presenza: childData.presenza,
                presenza_in_mensa: childData.presenza_in_mensa
            })
    
            child.save((error, registeredChild) => {
                if(error) 
                    res.json({
                        message: 'Errore nella creazione della scheda',
                    })
                else 
                    res.json({
                        message: 'Scheda bambino creata',
                        result: registeredChild
                    })
            })  
        }  
    })
    
})

router.post('/fetchchildren', (req, res) => {
    
    let userEmail = req.body

    Child.find({coordinatedBy: userEmail.email}).then(children => {
        if(!children) {
            console.log('Non ti è stato assegnato nessun bambino')
            res.status(401).json({
                message: 'Error'
            })
        }
        else {
            let lista = []

            children.forEach(element => {
                let item = {
                    'name': element.name,
                    'surname': element.surname,
                    'presenza': element.presenza,
                    'presenza_in_mensa': element.presenza_in_mensa
                }
                lista.push(item)
            });

            res.status(200).json({result: lista})
        }
    })
})

router.post('/createevent', (req, res) => {

    let eventData = req.body
    let found2 = false
    let found3 = false
    let found4 = false

    if(!eventData.team2)
        found2 = true
    else {
        User.findOne({email: eventData.team2}).then(user => {
            if(!user)
                found2 = false
            else
                found2 = true  
        })
    }

    if(!eventData.team3)
        found3 = true
    else {
        User.findOne({email: eventData.team3}).then(user => {
            if(!user)
                found3 = false
            else
                found3 = true  
        })
    }

    if(!eventData.team4)
        found4 = true
    else {
        User.findOne({email: eventData.team4}).then(user => {
            if(!user)
                found4 = false
            else
                found4 = true  
        })
    }

    User.findOne({email: eventData.team1}).then(user => {
        if(!user)
            res.json({
                message: 'Errore: non esiste nessun animatore con la prima mail specificata'
            })
        else {
            if(found2 && found3 && found4) {
                const event = new Event({
                    event_name: eventData.event_name,
                    team1: eventData.team1,
                    team2: eventData.team2,
                    team3: eventData.team3,
                    team4: eventData.team4,
                    event_hour: eventData.event_hour
                })

                event.save((error, registeredEvent) => {
                    if(error) 
                        res.json({
                            message: 'Errore nella creazione evento'
                        })
                else 
                    res.json({
                        message: 'Evento creato',
                        result: registeredEvent
                    })
                })
            }
            else {
                if(!found2)
                    res.json({ message: 'Errore: non esiste nessun animatore con la seconda mail specificata' })
                else if(!found3)
                    res.json({ message: 'Errore: non esiste nessun animatore con la terza mail specificata' })
                else
                    res.json({ message: 'Errore: non esiste nessun animatore con la quarta mail specificata' })
            }
        }     
    })
})

router.post('/fetchevents', (req, res) => {

    let userEmail = req.body
    

    Event.find({$or:[{team1: userEmail.email}, {team2: userEmail.email}, {team3: userEmail.email}, {team4: userEmail.email}]}).then(events => {
        if(!events)
            console.log('Oggi non hai nulla da fare, strano')
        else {
            let lista = []
            
            events.forEach(element => {
                
                let item = {
                    'eventName': element.event_name,
                    'eventHour': element.event_hour
                }

                lista.push(item)
            })

            res.status(200).json({result: lista})
        }
    })
})


module.exports = router