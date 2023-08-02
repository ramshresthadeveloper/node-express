const jwt=require('jsonwebtoken');
const UserService=require('../services/UserService')
const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_TOKEN_SECRET)
        const user=await UserService.getUserbyIdAndToken(decoded._id,token);
        if(!user){
            throw new Error();
        }
        req.user=user;
        next();
    }
    catch(e){
        res.status(401).send({error:"Please Authenticate"});
    }
}
module.exports=auth