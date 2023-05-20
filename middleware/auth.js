const jwt = require ('jsonwebtoken');
 /* Protéger les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes */
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};