const  express =  require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.apiUserLogin);
router.get("/logout", AuthController.apiUserLogout);

module.exports =  router;