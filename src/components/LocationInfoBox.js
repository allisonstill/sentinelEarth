// src/components/LocationInfoBox.js
import '../index.css';

const LocationInfoBox = ({ info, onClose }) => {
  return (
    <div className="location-info upgraded">
      <button onClick={onClose} className="close-btn">✖</button>
      <h2>{info.title}</h2>
      <ul>
        <li><strong>ID:</strong> {info.id}</li>
        {info.date && <li><strong>Date:</strong> {new Date(info.date).toLocaleString()}</li>}
        {info.link && (
          <li>
            <strong>More Info:</strong>{' '}
            <a href={info.link} target="_blank" rel="noopener noreferrer">
              View on NASA EONET
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LocationInfoBox;