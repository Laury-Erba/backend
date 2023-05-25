//importation du package multer 
const multer = require('multer');
//type de fichier accepté
const MIME_TYPES = { // dictionnaire d'extensions d'images
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// création de l'object de configuration multer 
const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // nouveau nom du fichier image pour éviter les doublons
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
module.exports = multer({ storage: storage}).single('image'); 
