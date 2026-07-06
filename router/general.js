const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const baseURL = "http://localhost:5000";

public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching books"
        });
    }
});

public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get(`${baseURL}/isbn/${isbn}`);

        if (
            !response.data ||
            (typeof response.data === "object" && Object.keys(response.data).length === 0)
        ) {
            return res.status(404).json({
                success: false,
                message: `No book found with ISBN ${isbn}`
            });
        }

        return res.status(200).json(response.data);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                message: `No book found with ISBN ${isbn}`
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching book by ISBN"
        });
    }
});

public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(`${baseURL}/author/${author}`);

        if (
            !response.data ||
            (Array.isArray(response.data) && response.data.length === 0) ||
            (typeof response.data === "object" && !Array.isArray(response.data) && Object.keys(response.data).length === 0)
        ) {
            return res.status(404).json({
                success: false,
                message: `No books found for author '${author}'`
            });
        }

        return res.status(200).json(response.data);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                message: `No books found for author '${author}'`
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching books by author"
        });
    }
});

public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(`${baseURL}/title/${title}`);

        if (
            !response.data ||
            (Array.isArray(response.data) && response.data.length === 0) ||
            (typeof response.data === "object" && !Array.isArray(response.data) && Object.keys(response.data).length === 0)
        ) {
            return res.status(404).json({
                success: false,
                message: `No books found with title '${title}'`
            });
        }

        return res.status(200).json(response.data);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                message: `No books found with title '${title}'`
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching books by title"
        });
    }
});

module.exports.general = public_users;
