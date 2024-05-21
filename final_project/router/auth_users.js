const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const authenticatedUser = (username, password) => { //returns boolean
  let validUsers = users.filter((user) => user.username === username && user.password === password);
  return validUsers.length > 0
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(404).json({ message: "Error logging in" });
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ data: password }, "access", { expiresIn: 60 * 60 });
    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } else return res
    .status(208)
    .json({ message: "Invalid Login. Check username and password" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const book = books[req.params.isbn]
  if (!book) res.status(404).send("Book no found")
  book.reviews[req.session.authorization.username] = req.body.review
  res.status(200).json({ message: "Review added successfully", reviews: book.reviews })
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const book = books[req.params.isbn]
  if (!book) res.status(404).send("Book no found")
  delete book.reviews[req.session.authorization.username]
  res.status(200).json({ message: "Review removed successfully", reviews: book.reviews })
});

module.exports.authenticated = regd_users;
module.exports.users = users;
