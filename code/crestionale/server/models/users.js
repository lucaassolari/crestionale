const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creiamo un'istanza Schema di mongoose
const Schema = mongoose.Schema
// Creiamo uno schema per i dati dell'utente presenti in MongoDB
const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

// mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
// You will get a Mongoose validation error when you attempt to violate a unique constraint, 
// rather than an E11000 error from MongoDB.
userSchema.plugin(uniqueValidator);

/*
* Creiamo un modello per lo schema ed esportiamolo. Come parametri dobbiamo passare il nome che vogliamo
* dare al modello, lo schema appena creato e la collezione nel db alla quale riferirsi. Ora abbiamo un
* modello mongoose che può essere usato per leggere, modificare, eliminare ecc i documenti nel db
*/
module.exports = mongoose.model('user', userSchema, 'users')
