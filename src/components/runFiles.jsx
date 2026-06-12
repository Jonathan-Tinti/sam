import React from 'react'
import { useState } from 'react' 

const Home = () => {
    const [scripts, setScripts] = useState([]); 
    const [filePath, setFilePath] = useState('');
    const [output, setOutput] = useState(''); 
    const [loading, setLoading] = useState(false); 

    function handleRunScript() {
      if (!filePath) {
        alert('Please enter a file path'); 
        return; 
      }
      setLoading(true); 
      fetch('http://localhost:5001/api/run-python', {
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
      <h1>Run Python Script</h1>
      <input 
        type="text"
        placeholder="Enter file path"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)} 
        />
        <button onClick={handleRunScript}>Run</button> 
        {loading && <p>Running script...</p>}
        {output && <div>
          <h2>Output</h2>
          <pre> {output}</pre>
          </div>}
    </div>
  )
}

export default Home