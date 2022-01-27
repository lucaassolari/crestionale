const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creiamo un'istanza Schema di mongoose
const Schema = mongoose.Schema
// Creiamo uno schema per i dati dell'utente presenti in MongoDB
const eventSchema = new Schema({
    event_name: {type: String, required: true},
    team1: {type: String, required: true},
    team2: {type: String, required: false},
    team3: {type: String, required: false},
    team4: {type: String, required: false},
    event_hour: {type: Number, required: true}
})

eventSchema.plugin(uniqueValidator);
module.exports = mongoose.model('event', eventSchema, 'events')