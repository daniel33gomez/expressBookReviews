const express = require('express');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.query
  if (!username || !password) return res.status(404).json({ error: "No username or password provided" })
  if (users.find(user => user.username)) return res.status(404).json({ error: "User already exists" })
  else {
    users.push({ username, password })
    return res.status(200).json({ msg: "User created successfully" })
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  return books[req.params.isbn]
    ? res.send(books[req.params.isbn])
    : res.status(404).json({ message: "Book no found" })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const book = Object.values(books).filter(b => b.author === req.params.author)
  if (book.length > 0) return res.send(book[0])
  else return res.status(404).json({ message: "Book no found" })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const book = Object.values(books).filter(b => b.title === req.params.title)
  if (book.length > 0) return res.send(book[0])
  else return res.status(404).json({ message: "Book no found" })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  return books[req.params.isbn]
    ? res.send(books[req.params.isbn]["reviews"])
    : res.status(404).json({ message: "Book no found" })
});

module.exports.general = public_users;
