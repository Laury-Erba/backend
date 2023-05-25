//importation du router d'express
const express = require('express');
const router = express.Router();
// importation des controllers 
const sauceCtrl = require('../controllers/sauce');
// importation du middelware multer
const auth = require('../middleware/auth'); // middleware qui permet d'authentifier les pages de l'application
const multer = require('../middleware/multer-config'); // middleware qui définit la destination et le nom de fichier des images

// definition des router 
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;