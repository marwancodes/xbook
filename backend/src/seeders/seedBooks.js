import Book from "../models/book.model.js";


export const seedInitialBooks = async (userId) => {
  try {
    const existingBooks = await Book.find();

    if (existingBooks.length === 0) {
        const books = [
            {
            title: "The Alchemist",
            caption: "A journey of a shepherd boy",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg",
            rating: 5,
            user: userId,
            },
            {
            title: "Atomic Habits",
            caption: "Build good habits and break bad ones",
            image:
                "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
            rating: 4,
            user: userId,
            },
            {
            title: "Rich Dad Poor Dad",
            caption: "What the rich teach their kids about money",
            image:
                "https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg",
            rating: 4,
            user: userId,
            },
        ];

        await Book.insertMany(books);
        console.log("Book seed data inserted.");
    }

  } catch (err) {
    console.error("Error seeding books:", err);
  }
};
