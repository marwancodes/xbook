import cloudinary from "../config/cloudinary.js";
import Book from "../models/BookModel.js";


//*************** Create new book ****************/
export const createNewBook = async ({title , caption, rating, image, user}) => {

    if (!title || !caption || !rating || !image) {
        return { data: 'All fields are required', statusCode: 400 };
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
        user, // req.user is set by the protectRoute middleware
    });

    await newBook.save();

    return { data: newBook, statusCode: 201 };
}

//*************** Get all books ******************/
export const getAllBooks = async () => {
    
}