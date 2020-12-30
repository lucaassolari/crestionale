// Importazione dei package installati al punto 3
const express = require('express')
const bodyParser = require('body-parser')
// cors da inserire sempre sennò non funziona
const cors = require('cors')

const PORT = 3000 // Numero della porta sulla quale dovrà girare il server express
const api = require('./routes/api') // Per dire al server di usare la route creata
const app = express() // Creazione di un'istanza di express
app.use(cors())
app.use(bodyParser.json()) // Specifica che il body-parser userà dati in formato json

/*
* Per dire che il link /api dovrà chiamare la route api, e questa route sarà quella specificata
* tramite il comando require eseguito sopra
*/
app.use('/api', api)

// 'function' è una funzione di callback che ha come parametri una richiesta (req) e una risposta (res)
app.get('/', function(req, res){
    res.send('Hello from server')
})

// Si specifica su quale porta il server dovrà runnare
app.listen(PORT, function() {
    console.log('Server running on localhost:' + PORT)
})

module.exports = app