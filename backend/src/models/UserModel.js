import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
    },
    profilePicture: {
        type: String,
        default: '', // Default to an empty string if no profile picture is provided
    },

});

const User = mongoose.model('User', userSchema);
export default User;
// This code defines a Mongoose schema for a User model in a Node.js application.
// The schema includes fields for name, email, password, profile picture, and admin status.