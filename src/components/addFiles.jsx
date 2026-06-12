import React from 'react'
import { useState } from 'react'

const addFiles = () => {
 
    const [scripts, setScripts] = useState([]); 
    const [filePath, setFilePath] = useState('');
    const [loading, setLoading] = useState(false); 

    function handleAddScript() {
    setLoading(true); 
    fetch('http://localhost:5001/api/add-script', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ filePath }),
    }).then(res => res.json())
    .then(data => {
        setLoading(false);
    })
    .catch(err => {
        setLoading(false); 
        if (err.response) {
            alert(`Error: ${err.response.data.error}`); 
        }
    })
    .then(data => {
        if (data.success) {
            setOutput(data.stdout); 
        } else {
            alert(`Error: ${data.error || 'Unknown error occurred'}`);
        }
    })
    }
  
  
    return (
      <div>
        <h1>Add Python Script</h1>
        <input 
          type="text"
          placeholder="Enter file path"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)} 
          />
          <button onClick={handleAddScript}>Add</button> 
          {loading && <p>Adding script...</p>}
      </div>
    )
}

export default addFiles