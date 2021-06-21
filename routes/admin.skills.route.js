////instanciamos router
const router=require('express').Router();
const skillsController=require('../controllers/skills.controller');
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;


//aplicarle rutas a esa instancia
//router.get('/', userController.getUserIndexes);
router.get('/',midd.verificathionUsers,skillsController.getUserIndexes);
router.get('/editProfile/:idUser',midd.verificathionUsers,skillsController.editSkillsGet);
router.post('/editProfile/:idUser',midd.verificathionUsers,skillsController.editSkillsPost);





module.exports= router;