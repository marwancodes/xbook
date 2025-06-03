import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';


const protectRoute = async (req, res, next) => {


    // get token from headers
    const token = req.headers("Authorization").replace('Bearer ', ''); // Assuming the token is sent as a Bearer token in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // find user by id
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(401).json({ error: 'Unauthorized, invalid token' });
    }
}

export default protectRoute;