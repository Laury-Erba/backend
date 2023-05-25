const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// inscription du user
exports.signup = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({ // créer un nouveau user
        email: req.body.email, // l'adresse mail
        password: hash // le mot de passe haché
      });
      user.save() // et mongoose le stocke dans la bdd
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// connexion du user
exports.login = (req, res, next) => { 
  User.findOne({ email: req.body.email }) // on vérifie que l'adresse mail figure bien dan la base de données
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // on compare les mots de passes
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( // on génère un token de session pour le user maintenant connecté
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};