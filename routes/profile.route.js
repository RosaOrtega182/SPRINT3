const router = require("express").Router();
const profileController = require("../controllers/profile.controller");
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;

router.get('/',midd.verificathionUsers,profileController.getUserIndexes);
router.get('/detailOwner/:id',midd.verificathionUsers,profileController.getOwnerProfile);
router.get('/friendRequests/:id',midd.verificathionUsers,profileController.getFriendRequests);
router.get('/friends/:id',midd.verificathionUsers,profileController.getFriends);
router.get('/editProfile/:idUser',midd.verificathionUsers,profileController.editProfileGet);
router.post('/editProfile/:idUser',midd.verificathionUsers,profileController.editProfilePost);

module.exports = router;