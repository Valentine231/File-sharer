import express from 'express';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';  
import path from 'path';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from OpenLibrary API.' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }
  res.status(200).json({
    message: 'File uploaded successfully!',
    file: file.originalname,
  });
});

const PORT = 3000; 

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;