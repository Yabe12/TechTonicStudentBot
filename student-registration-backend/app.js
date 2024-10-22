const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); // Add this line

const app = express();
const upload = multer();

app.post('/api/register', upload.single('cv'), (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); // Create the uploads directory if it doesn't exist
  }

  // Save the file
  const filePath = path.join(uploadsDir, req.file.originalname);
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error('Error saving file:', err); // Log the error
      return res.status(500).json({ error: 'Failed to save file' });
    }

    // Respond to client
    res.json({
      message: 'Form submitted successfully',
      data: req.body,
      filePath: filePath
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
