////instanciamos router
const router=require('express').Router();
const userController=require('../controllers/user.controller');
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;


//aplicarle rutas a esa instancia
//router.get('/', userController.getUserIndexes);
router.get('/',midd.verificathionUsers,isAdmin,userController.getUserIndexes);
router.get('/addUser',midd.verificathionUsers,isAdmin,userController.addUserGet);
router.post('/addUser',midd.verificathionUsers,isAdmin,userController.registerAndAddUserPost);
router.get('/editUser/:idUser',midd.verificathionUsers,isAdmin,userController.editUserGet);
router.post('/editUser/:idUser',midd.verificathionUsers,isAdmin,userController.editUserPost);
router.get('/deleteUser/:idUser',midd.verificathionUsers,isAdmin,userController.deleteUserGet);




module.exports= router;