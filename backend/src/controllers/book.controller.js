import Book from "../models/book.model.js";
import cloudinary from "../config/cloudinary.js";
import { seedInitialBooks } from "../seeders/seedBooks.js";



export const createBook = async (req, res) => {
    try {
        // get data from fields
        const { title, caption, rating, image } = req.body;
        if (!title || !caption || !rating || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        };

        // upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageURL = uploadResponse.secure_url;

        // save book to database
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageURL,
            user: req.userId, // req.user is set by the protectRoute middleware
        });

        await newBook.save();

        res.status(201).json(newBook);
    
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//**************** Get all books ******************/
export const getAllBooks = async (req, res) => {
	try {
        const page = req.query.page || 1; // Get the page number from query parameters, default to 1
        const limit = 10; // Number of books per page
        const skip = (page - 1) * limit; // Calculate the number of books to skip

        let books = await Book.find()
            .sort({ createdAt: -1 }) // Fetch all books and sort by creation date in descending order
            .skip(skip) // Skip the calculated number of books
            .limit(limit) // Limit the number of books returned
            .populate('user', 'username profilePicture') // Populate the user field with username and profile picture

        console.log("req.user:", req.userId);
        if (books.length === 0) {
            await seedInitialBooks(req.userId); // Pass the user ID here
            books = await Book.find(); // re-fetch after seeding
        }
        
        const totalBooks = await Book.countDocuments(); // Get the total number of books for pagination


        res.status(200).json({
            books,
            currentPage: page,
            totalBooks, // Calculate total pages based on total books and limit
            totalPages: Math.ceil(totalBooks / limit)
        });

	} catch (error) {
		console.error("Error fetching books:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
