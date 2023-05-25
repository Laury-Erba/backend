//importation du package jsonwebtoken pour fénérer les tokens
const jwt = require('jsonwebtoken');
// Export des midddleware 
module.exports = (req, res, next) => {
    //vérification des données 
    try {
        const token = req.headers.authorization.split(' ')[1]; // on récupère le token de la requête entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on le vérifie
        const userId = decodedToken.userId;         // on récupère l'id du token
        if (req.body.userId && req.body.userId !== userId) { // on compare le userid de la requête à celui du token
            throw 'User id non valable !';
        } else {
            next();
        }
    } catch(error){
        res.status(401).json({ error: new Error('Requête non authentifiée !')});
    }
};