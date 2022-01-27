const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creiamo un'istanza Schema di mongoose
const Schema = mongoose.Schema
// Creiamo uno schema per i dati dell'utente presenti in MongoDB
const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    coordinatedBy: {type: String, required: true},
    presenza: {type: Number, required: true},
    presenza_in_mensa: {type: Boolean, required: true}
    // la proprietà ref permette di definire a quale modello fa riferimento l'oggetto id che andiamo a salvare
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('child', userSchema, 'children')