const express = require("express");
const app = express();

const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');


mongoose.connect('mongodb+srv://laury:Ramses4269@atlascluster.z4m1ux1.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  app.use('/api/stuff', stuffRoutes);
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res) => {
    res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
