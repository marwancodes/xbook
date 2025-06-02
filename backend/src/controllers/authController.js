import { register } from "../services/userService.js";


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        // Get random avatar
        const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
        const { data, statusCode } = await register({username, email, password, profilePicture});
        console.log(data);
        res.status(statusCode).send(data);

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(stat).send({ error: 'Internal server error' });
    }
}

export const loginUser = async (req, res) => {
    res.send('Login Page');
}

