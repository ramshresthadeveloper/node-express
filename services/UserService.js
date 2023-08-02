const User = require("../models/User");
module.exports = class UserService {
    static async getAllUsers() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            return error;
        }
    }

    static async createUser(data) {
        try {
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password,
                age: data.age,
                avatar: data.avatar
            }
            const user = await new User(newUser).save();
            const token = await user.generateAuthToken();
            return token;
        } catch (error) {
            return error;
        }

    }
    static async getUserbyId(userId) {
        try {
            const singleUserResponse = await User.findById({ _id: userId });
            return singleUserResponse;
        } catch (error) {
            return error;
        }
    }

    static async getUserbyIdAndToken(userId, token) {
        try {
            const singleUserResponse = await User.findOne({ _id: userId, token: token });
            return singleUserResponse;
        } catch (error) {
            return error;
        }
    }

    static async UpdateUser(userId, updateArgs) {
        try {
            await User.findByIdAndUpdate(userId, updateArgs);
            const updateResponse = await User.findById({ _id: userId });
            return updateResponse;
        } catch (error) {
            return error;
        }
    }

    static async deleteUser(userId) {
        try {
            const deletedResponse = await User.deleteOne({ _id: userId });
            return deletedResponse;
        } catch (error) {
            return error;
        }
    }
}