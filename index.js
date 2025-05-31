const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Fake encryption function (simulation)
function fakeEncrypt(filePath) {
  const data = fs.readFileSync(filePath);
  const encrypted = Buffer.from(data).toString('base64'); // basic encoding
  return encrypted;
}

// API route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const patientName = req.body.name;
  const filePath = req.file.path;

  console.log(`Received file for patient: ${patientName}`);

  const encryptedData = fakeEncrypt(filePath);

  // Simulate saving encrypted data (not actually storing it now)
  console.log(`Encrypted data for ${patientName}:`, encryptedData.slice(0, 50) + '...');

  // Delete original file (simulate privacy)
  fs.unlinkSync(filePath);

  res.json({
    status: 'Success',
    patient: patientName,
    message: 'File encrypted and uploaded securely',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`VaultCare backend running on port ${PORT}`);
});
