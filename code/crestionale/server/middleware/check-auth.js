// middleware per verificare se si è autenticati con il token

const jwt = require('jsonwebtoken')

//next è per fare andare avanti l'esecuzione, quindi in caso di autorizzazione
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]   // guardo nell'header della mia incoming request per cercare il token
        const decodedToken = jwt.verify(token, 'thats_the_secret_key')    // se trovo il token, quindi non vado in eccezione, devo verificarlo
        next()   // se tutto va a termine, chiamo next e faccio proseguire l'esecuzione
    } catch(error) {    // se fallisce vuol dire che non abbiamo un token quindi non siamo autenticati o non riusciamo a verificarlo correttamente
        res.status(401).json({message: 'Auth failed'})
    }
    
}