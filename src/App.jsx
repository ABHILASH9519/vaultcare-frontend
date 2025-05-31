import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!file || !patientName) {
      alert('Please fill out both fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', patientName);

    try {
      const res = await axios.post('https://vaultcare-backend.onrender.com/upload', formData);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">VaultCare</h1>
      <input
        type="text"
        placeholder="Enter Patient Name"
        className="p-2 border rounded mb-3 w-full"
        value={patientName}
        onChange={e => setPatientName(e.target.value)}
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="mb-4 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Encrypt & Upload
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default App;
