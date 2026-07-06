const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if username already exists
const isValid = (username) => {
    let usersWithSameName = users.filter(
        (user) => user.username === username
    );
    return usersWithSameName.length > 0;
};

// Check username and password
const authenticatedUser = (username, password) => {
    let validUsers = users.filter(
        (user) => user.username === username && user.password === password
    );
    return validUsers.length > 0;
};

// Login
regd_users.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({
            message: "Username and password required"
        });
    }

    if (authenticatedUser(username, password)) {

        const accessToken = jwt.sign(
            { data: username },
            "access",
            { expiresIn: 60 * 60 }
        );

        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({
            message: "User successfully logged in"
        });
    }

    return res.status(208).json({
        message: "Invalid Login. Check username and password"
    });
});

// Add or modify a review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    books[isbn].reviews[username] = review;

    return res.status(200).json({
        message: "Review added/updated successfully"
    });
});

// Delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
    }

    return res.status(200).json({
        message: "Review deleted successfully"
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;