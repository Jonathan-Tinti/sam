const express = require('express');
const cors = require('cors'); 
const fs = require('fs'); 
const { exe } = require('child_process'); 
const path = require('path'); 

const app = express(); 
app.use(cors()); 
app.use(express.json());
app.post('/api/run-python', (req, res) => {
    const { filePath } = req.body; 
    
    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found at the specified path.' });
    }

    if (path.extname(filePath) !== '.py') {
        return res.status(400).json({ error: 'Only .py files are supported.' });
    }

    exec(`python "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ 
                success: false, 
                error: error.message, 
                stderr: stderr 
            });
        }
        res.json({ 
            success: true, 
            stdout: stdout, 
            stderr: stderr 
        });
    });
});

app.listen(5001, () => {
    console.log('Backend server running on http://localhost:5001');
})