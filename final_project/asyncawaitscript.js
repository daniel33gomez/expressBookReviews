const axios = require('axios');
const BASE_URL = "http://localhost:5000";

(async () => {

  const requester = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });

  async function getAllBooks() {
    const response = await requester.get();
    if (response.status === 200) return response.data;
    else return 'Could not get books'
  }

  async function getBookByISBN(isbn) {
    const response = await requester.get(`isbn/${isbn}`);
    if (response.status === 200) return response.data;
    else return 'Could not get book'
  }

  async function getBookByAuthor(author) {
    const response = await requester.get(`author/${author}`);
    if (response.status === 200) return response.data;
    else return 'Could not get book'
  }

  async function getBookByTitle(title) {
    const response = await requester.get(`title/${title}`);
    if (response.status === 200) return response.data;
    else return 'Could not get book'
  }

  // Execute requests
  console.log(await getAllBooks())
  console.log(await getBookByISBN(1))
  console.log(await getBookByAuthor("Chinua Achebe"))
  console.log(await getBookByTitle("Things Fall Apart"))
})();
