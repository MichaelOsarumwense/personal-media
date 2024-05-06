import React, { useState } from 'react';
import '../components/layout/css/download.css';

function DownloadPage() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    const link = document.createElement('a');
    link.href = '/Lorem-ipsum.pdf';
    link.download = 'lorem-ipsum.pdf';
    link.click();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="download-page">
      <h1 className="download-title">Download PDF</h1>
      <button className="download-page-btn" onClick={handleDownload}>
        {loading ? (
          <div className="download-loader">
            <span>Loading...</span>
            <div className="download-spinner"></div>
          </div>
        ) : (
          'Download PDF'
        )}
      </button>
      <div className="home-container">
        <button className="home-btn" onClick={() => (window.location.href = '/')}>
          <i className="fa fa-home" aria-hidden="true"></i> Home
        </button>
      </div>
    </div>
  );
}

export default DownloadPage;
