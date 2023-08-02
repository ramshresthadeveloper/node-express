const  express =  require("express");
const auth=require('../middleware/auth');
const router = express.Router();

// custom routers 
const UserRoute=require('./UserRoute');
const AuthRoute=require('./AuthRoute');

router.use('/users',auth, UserRoute);
router.use('/', AuthRoute);

module.exports =  router;