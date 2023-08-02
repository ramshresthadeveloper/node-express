const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    token: {
        type: String
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN_SECRET);
    user.token = token;
    await user.save();
    return user;
}
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email: email })
    if (!user) {
        return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        return user;
    } else {
        return false;
    }
}
userSchema.statics.findByToken = async function (token) {
    const user = await User.findOne({ token: token })
    if (!user) {
        return false
    }
    return user;
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User