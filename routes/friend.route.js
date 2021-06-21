const router = require("express").Router();

const friendController = require("../controllers/friend.controller");
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;

router.get("/add/:id",midd.verificathionUsers, friendController.add);
router.get("/cancel/:id",midd.verificathionUsers, friendController.cancel);
router.get("/accept/:id",midd.verificathionUsers, friendController.accept);
router.get("/reject/:id",midd.verificathionUsers, friendController.reject);
router.get("/delete/:id",midd.verificathionUsers,  friendController.delete);

module.exports = router;
