// api/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';

const storage = multer.memoryStorage(); // Use in-memory storage for serverless environments
const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }
  res.status(200).json({
    message: 'File uploaded successfully!',
    file: file.originalname,
  });
});

export default apiRoute;
