const UserService = require("../services/UserService");
module.exports = class UserController {

   static async apiGetAllUsers(req, res) {
      try {
         const users = await UserService.getAllUsers();
         if (!users) {
            res.status(404).json("There are no user published yet!")
         }
         res.json(users);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiGetUserById(req, res) {
      try {
         let id = req.params.id || {};
         const article = await UserService.getUserbyId(id);
         res.json(article);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiCreateUser(req, res) {
      try {
         if(req.file){
            req.body.avatar=req.file.path;
         }
         const createdUser = await UserService.createUser(req.body);
         res.json(createdUser);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async apiUpdateUser(req, res) {
      try {
         const updateArgs = {};
         if (req.body.name) {
            updateArgs.name = req.body.name
         }
         if (req.body.email) {
            updateArgs.email = req.body.email
         }
         if (req.body.age) {
            updateArgs.age = req.body.age
         }
         const userId = req.params.id;
         const updateUser = await UserService.UpdateUser(userId, updateArgs);
         res.json(updateUser);

      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiDeleteUser(req, res) {
      try {
         const userId = req.params.id;
         const deleteResponse = await UserService.deleteUser(userId)
         res.json(deleteResponse);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

}