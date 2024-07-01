const { Router } = require("express");
const router = Router();

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/signin", loginUser);

module.exports = router;
