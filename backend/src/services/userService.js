import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';


export const register = async ({ username, email, password, profilePicture }) => {
    if (!username || !email || !password) {
        return { data: 'All fields are required', statusCode: 400 };
    }

    if (password.length < 6) {
        return { data: 'Password must be at least 6 characters long', statusCode: 400 };
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return { data: 'Invalid email format', statusCode: 400 };
    }

    if (username.length < 3 || username.length > 20) {
        return { data: 'Username must be between 3 and 20 characters', statusCode: 400 };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return { data: "User already exists", statusCode: 400 };
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return { data: 'Username already exists', statusCode: 400 };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture
    });

    await newUser.save();

    return { data: generateToken({ username, email }), statusCode: 201 };
    
};

//*************** Generate Token *******************/
const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiration time
    });
}