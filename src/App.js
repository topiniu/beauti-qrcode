import React, { useState } from 'react';
import QRCodeComponent from './QRCodeComponent';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://example.com');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="App">
      <input 
        type="text" 
        value={url} 
        onChange={handleUrlChange} 
        placeholder="Enter URL for QR code"
      />
      <QRCodeComponent url={url} />
    </div>
  );
}

export default App;
