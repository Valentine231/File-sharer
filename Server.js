import express from 'express';
import cors from 'cors';
import axios from 'axios'

const app = express()
app.use(cors()); // Enable CORS for development

// Proxy endpoint
app.get('/api/search', function (req, res) {
  const query = req.query.q; // Get the search query from the request
  axios
    .get('https://openlibrary.org/search.json?q=' + query)
    .then(function (response) {
      res.json(response.data); // Return the API response to the client
    })
    .catch(function (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Error fetching data from OpenLibrary API.' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, function () {
  console.log('Server running on http://localhost:' + PORT);
});

