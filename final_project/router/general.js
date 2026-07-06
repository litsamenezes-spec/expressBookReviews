const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const baseURL = "http://localhost:5000";

public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/isbn/${req.params.isbn}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book by ISBN" });
    }
});

public_users.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/author/${req.params.author}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author" });
    }
});

public_users.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/title/${req.params.title}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});

module.exports.general = public_users;
