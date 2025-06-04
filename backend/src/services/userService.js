import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';


//*************** Register User *******************/
export const register = async ({ username, email, password, profilePicture }) => {
    if (!username || !email || !password) {
        return { data: 'All fields are required', statusCode: 400 };
    }

    // Validate inputs
    if (!validator.isStrongPassword(password, { minLength: 6 })) {
        return { data: 'Password must be at least 6 characters long and contain a mix of letters, numbers, and symbols', statusCode: 400 };
    }

    if (!validator.isEmail(email)) {
        return { data: 'Invalid email format', statusCode: 400 };
    }

    if (!validator.isLength(username, { min: 3, max: 20 })) {
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

//*************** Login User *******************/
export const login = async ({ email, password }) => {
    if (!email || !password) {
        return { data: 'All fields are required', statusCode: 400 };
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
        return { data: 'Email not found', statusCode: 404 };
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    
    if (passwordMatch) {
        return { 
                data: generateToken({
                email, 
                username: findUser.username,
                profilePicture: findUser.profilePicture || '',
            }),
            statusCode: 200 };
    }
    

    return { data: 'Invalid password', statusCode: 400 };
    
}

//*************** Generate Token *******************/
const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiration time
    });
}