import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS for styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    console.log(jsonInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);
    
    try {
      // Validate JSON input
      const parsedJson = JSON.parse(jsonInput);
      console.log(parsedJson);

      // Call the backend API
      const response = await axios.post('https://bajaj-o6ut.onrender.com/bfhl', parsedJson);
      setResponseData(response.data);
      setIsSubmitted(true);
      console.log(response.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  return (
    <div className="App">
      <div className="form-container">
        <textarea
          className="api-input"
          placeholder='{"data":["M","1","334","4","B"]}'
          value={jsonInput}
          onChange={handleInputChange}
          rows={4}
          cols={50}
        />
        <br />
        <button className="submit-btn" type="submit" onClick={handleSubmit}>Submit</button>
      </div>

      {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

      {isSubmitted && responseData && (
        <>
          <div className="user-details">
            <h3>User Details</h3>
            <p><strong>User ID:</strong> {responseData.user_id}</p>
            <p><strong>Email:</strong> {responseData.email}</p>
            <p><strong>Roll Number:</strong> {responseData.roll_number}</p>
          </div>

          <div className="file-details">
            <h3>File Details</h3>
            <p><strong>File Valid:</strong> {responseData.file_valid ? 'Yes' : 'No'}</p>
            <p><strong>File MIME Type:</strong> {responseData.file_mime_type}</p>
            <p><strong>File Size (KB):</strong> {responseData.file_size_kb}</p>
          </div>

          <div className="dropdown-container">
            <label>Select Filter: </label>
            <select multiple={true} onChange={handleOptionChange}>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
          </div>

          <div className="response-container">
            <h3>Filtered Response</h3>
            {selectedOptions.includes('alphabets') && (
              <p><strong>Alphabets:</strong> {JSON.stringify(responseData?.alphabets)}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p><strong>Numbers:</strong> {JSON.stringify(responseData?.numbers)}</p>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <p><strong>Highest Lowercase Alphabet:</strong> {JSON.stringify(responseData?.highest_lowercase_alphabet)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
