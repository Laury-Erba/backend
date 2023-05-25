//Importation du package Express 
const express = require('express');
//Importation du package Mongoose
const mongoose = require('mongoose');
//Importation du package Body parser 
const bodyParser = require('body-parser');
//Importation du package Path pour définir les chemins 
const path = require('path');

//Importation des Router Sauces et User
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
// appel de la méthode express 
const app = express();

// Connection à la base de donnés MongooDB
mongoose.connect('mongodb+srv://laury:Ramses@cluster0.dnfna19.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 

  // Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // on autorise ce serveur à fournir des scripts pour la page visitée
  //res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.use(express.json()); //bodyparser "transformation des requetes en JSON"

//app.use(mongoSanitize()); // En prévention des injections
//app.use(helmet()); // helmet

//Gestion des routes principales 
app.use('/images', express.static(path.join(__dirname, 'images'))); // gestion images de manière statiques
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
    
 // export de l'application
module.exports = app;