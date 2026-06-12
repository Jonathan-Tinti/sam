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
    <div>Home</div>
  )
}

export default Home