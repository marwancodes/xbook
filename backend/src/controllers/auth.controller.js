import { generateTokenAndSetCookie } from "../utils/GenerateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';


//*********************** Register Endpoint ******************************/
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required'});
        }

        // Validate inputs
        if (!validator.isStrongPassword(password, { minLength: 6 })) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long and contain a mix of letters, numbers, and symbols' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format'});
        }

        if (!validator.isLength(username, { min: 3, max: 20 })) {
            return res.status(400).json({ success: false, message: 'Username must be between 3 and 20 characters'});
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User already exists"});
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Get random avatar
        const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture
        });

        await newUser.save();

        const token = generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            token, // Include the token in the response
            user: {
                ...newUser._doc, // Spread operator to include all user fields
                password: undefined, // Exclude password from response
            }
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//*********************** Logout Endpoint ******************************/
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

//*********************** Login Endpoint ******************************/
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const { data, statusCode } = await login({ email, password });

        if (!email || !password) {
            return res.status(400).json({ data: 'All fields are required', statusCode: 400 });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        
        generateTokenAndSetCookie(res, user._id);

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Login successfully", 
            user: {
                ...user._doc, // Spread operator to include all user fields
                password: undefined, // Exclude password from response
            }
        }); 

    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

