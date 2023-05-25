//importation du package Mongoose
const mongoose = require('mongoose');

//importation du package Mongoose-unique-validator 
const uniqueValidator = require('mongoose-unique-validator'); // package vérification d'un email unique

// Création du schéma 
const userSchema = mongoose.Schema({ // schema du modèle user demandé
    email: { type: String, required: true, unique: true }, // unique -> une adresse mail = un user
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // utilisation du package
module.exports = mongoose.model('User', userSchema); // export du schema 