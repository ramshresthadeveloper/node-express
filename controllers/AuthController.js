const AuthService = require("../services/AuthService");
module.exports = class AuthController {
    static async apiUserLogin(req, res, next) { 
        try {
            const response = await AuthService.userLogin(req.body);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiUserLogout(req, res, next) { 
        try {
            const response = await AuthService.userLogout(req);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}