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
        required: [true, 'Please Provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    profilePhoto: String,
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

const User = mongoose.model('User', userSchema);
module.exports = User;