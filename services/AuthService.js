const User = require("../models/User");
module.exports = class AuthService {
    static async userLogin(data) {
        try {
            const user = await User.findByCredentials(data.email, data.password)
            const token = await user.generateAuthToken()
            return token
        } catch (error) {
            return error;
        }
    }
    static async userLogout(req) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const user=await User.findByToken(token);
            if(user){
                await user.generateAuthToken()
                return {success:true};
            } 
            return {error:"User not found"};
        } catch (error) {
            return error;
        }
    }
}