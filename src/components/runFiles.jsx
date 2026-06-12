import React from 'react'
import { useState } from 'react' 

const runScripts = () => {
    const [scripts, setScripts] = useState([]); 
    const [filePath, setFilePath] = useState('');
    const [output, setOutput] = useState(''); 
    const [loading, setLoading] = useState(false); 

    function handleRunScript() {
      setLoading(true); 
      fetch('http://localhost:5001/api/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({id: filePath}),
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
          setOutput(data.output); 
        } else {
          alert(`Error: ${data.error || 'Unknown error occurred'}`);
        }
      })
    }


  return (
    <div>
      <h1>Run Python Script</h1>
        <button onClick={handleRunScript}>Run</button> 
        {loading && <p>Running script...</p>}
        {output && <div>
          <h2>Output</h2>
          <pre> {output}</pre>
          </div>}
    </div>
  )
}

export default runScripts