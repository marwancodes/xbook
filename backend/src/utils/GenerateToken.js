import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token valid for 7 days
    });

    return token;
};