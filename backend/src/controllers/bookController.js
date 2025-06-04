import Book from "../models/BookModel.js";



export const createBook = async (req, res) => {
    try {
        res.send('create book');
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//**************** Get all books ******************/
// export const getAllBooks = async (req, res) => {
//     try {
//         const page = req.query.page || 1; // Get the page number from query parameters, default to 1
//         const limit = 10; // Number of books per page
//         const skip = (page - 1) * limit; // Calculate the number of books to skip
//         const books = await Book.find()
//             .sort({ createdAt: -1 }) // Fetch all books and sort by creation date in descending order
//             .skip(skip) // Skip the calculated number of books
//             .limit(limit) // Limit the number of books returned
//             .populate('user', 'username profilePicture') // Populate the user field with username and profile picture
        
//             const totalBooks = await Book.countDocuments(); // Get the total number of books for pagination
//         res.status(200).json({
//             books,
//             currentPage: page,
//             totalBooks, // Calculate total pages based on total books and limit
//             totalPages: Math.ceil(totalBooks / limit)
//         });
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
    