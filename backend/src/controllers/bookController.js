import cloudinary from "../config/cloudinary.js";
import Book from "../models/BookModel.js";



export const createBook = async (req, res) => {
    try {
        const { title , caption, rating, image} = req.body;

        if (!title || !caption || !rating || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageURL = uploadResponse.secure_url;

        // save book to database
        const newBook = new Book({
            title,
            caption,
            image: imageURL,
            rating,
            user: req.user._id, // req.user is set by the protectRoute middleware
        });

        await newBook.save();
        res.status(201).json(newBook);

    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
    