const  express =  require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const upload = require('../middleware/media')

router.get("/", UserController.apiGetAllUsers);
router.post("/create",upload.single('file'), UserController.apiCreateUser);
router.get("/:id", UserController.apiGetUserById);
router.put("/:id/edit", UserController.apiUpdateUser);
router.delete("/:id/delete", UserController.apiDeleteUser);

module.exports =  router;