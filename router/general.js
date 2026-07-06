const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const baseURL = "http://localhost:5000";

public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        return res.status(200).json(response.data);
    } catch {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        const books = response.data;

        const book = books[req.params.isbn];

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch {
        return res.status(500).json({ message: "Error fetching book" });
    }
});

public_users.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        const books = response.data;

        const result = Object.values(books).filter(
            b => b.author.toLowerCase() === req.params.author.toLowerCase()
        );

        if (result.length === 0) {
            return res.status(404).json({ message: "No books found for author" });
        }

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

public_users.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        const books = response.data;

        const result = Object.values(books).filter(
            b => b.title.toLowerCase() === req.params.title.toLowerCase()
        );

        if (result.length === 0) {
            return res.status(404).json({ message: "No books found for title" });
        }

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

module.exports.general = public_users;
