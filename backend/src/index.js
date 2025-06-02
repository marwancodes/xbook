import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json()); // Parse JSON bodies


app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Uncomment the line below to connect to the database
    connectDB();
});