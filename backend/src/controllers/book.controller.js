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

//**************** Get all books + Pagination => infinite loading ******************/
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

//**************** Delete book ******************/
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ seccuss: false, message: "Book not found" });
        };

        // check if the user is the creator of the book
        if (book.user.toString() !== req.userId.toString()) {
            return res.status(401).json({ seccuss: false, message: "Unauthorized" }); 
        };

        // delete the image from cloudinary as well
        if(book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0]; // get the thing after last slash in cloudinary URL
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                console.log("Error deleting the image from cloudinary", deleteError)
            }
        }

        await book.deleteOne();

        res.status(200).json({ seccuss: true, message: "Book deleted successfully" }); 

    } catch (error) {
        console.error("Error deleting book:", error);
		res.status(500).json({ error: "Internal server error" });
    }
};

//**************** Get user books ******************/
export const getUserBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        console.error("Get user books error", error);
		res.status(500).json({ error: "Server error" });
    }
}