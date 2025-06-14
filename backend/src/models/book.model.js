import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1, // Minimum rating
            max: 5, // Maximum rating
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
    }
    , {
        timestamps: true,
    }
);
const Book = mongoose.model("Book", bookSchema);
export default Book;