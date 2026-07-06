const express = require('express');
const axios = require('axios');

const public_users = express.Router();

// Base URL of your running server
const baseURL = "http://localhost:5000"; // change port if needed

// TASK 10: Get all books (async-await + axios)
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get(`${baseURL}/`);
        return res.status(200).send(JSON.stringify(response.data, null, 4));
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// TASK 11: Get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`${baseURL}/isbn/${isbn}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching book by ISBN" });
    }
});

// TASK 12: Get books by author
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const response = await axios.get(`${baseURL}/author/${author}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by author" });
    }
});

// TASK 13: Get books by title
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const response = await axios.get(`${baseURL}/title/${title}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by title" });
    }
});

module.exports.general = public_users;