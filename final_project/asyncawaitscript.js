const axios = require('axios');
const BASE_URL = "http://localhost:5000";

(async () => {
  async function getAllBooks() {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
  console.log(await getAllBooks())

  async function getBookByISBN(isbn) {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
  }
  console.log(await getBookByISBN(1))

  async function getBookByAuthor(author) {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
  }
  console.log(await getBookByAuthor("Chinua Achebe"))

  async function getBookByTitle(title) {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
  }
  console.log(await getBookByTitle("Things Fall Apart"))
})()