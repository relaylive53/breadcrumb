const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
    userName: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    email: {
        type: String,
        // required: [true, 'Please Provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'hr', 'admin'],
        default: 'user'
    },
    dob: {
        type: Date,
        required: [true, 'Please provide your dob'],
    },
    gender: {
        type: String,
        required: [true, 'Please provide a gender'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide a password'],
        validate: {
            // This only works on CREATE and SAVE !!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    flag: {
        type: Number,
        enum: [0, 1],
        default: 1,
        required: true,
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candiatePassword, userPassword) {
    return await bcrypt.compare(candiatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        changedTimeSttamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeSttamp;
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;