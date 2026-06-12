const express = require('express');
const cors = require('cors'); 
const fs = require('fs'); 
const { exe } = require('child_process'); 
const path = require('path'); 

const app = express(); 
app.use(cors()); 
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'scripts.json'); 

function readPaths() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8'); 
        return JSON.parse(data); 
    }
    catch (err) {
        return []; 
    }
}

function writePaths(paths) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(paths, null, 2), 'utf8');
}

app.post('/api/run-python', (req, res) => {
    const { id } = req.body;
    const currentPaths = readPaths(); 
    const target = currentPaths.find(script => script.id === id); 
    if(!target) {
        return res.status(404).json({error: "File not found"}); 
    } 

    if (path.extname(target.path) !== '.py') {
        return res.status(400).json({ error: 'Only .py files are supported.' });
    }

    execFile(`python "${target.path}"`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ 
                success: false, 
                error: error.message, 
                stderr: stderr 
            });
        }
        res.json({ 
            success: true, 
            output: stdout
        });
    });
});

app.post('api/add-script', (req, res) => {
    const { name, filePath } = req.body;
    if (!name || !filePath) {
        return res.status(400).json({error: "Name and file path required"}); 
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({error: "File not found at the specified path"}); 
    }
    const stats = fs.statSync(filePath); 
    if (!stats.isFile()) {
        return res.status(400).json({error: "Provided a file path, not a directory"}); 
    }
    const currentPaths = readPaths(); 
    if (currentPaths.some(script => script.name === name)) {
        return res.status(400).json({error: "This file is already in here"}); 
    }
    const newScript = {
        id: Date.now().toString(), 
        name,
        path: filePath
    };
    currentPaths.push(newScript); 
    writePaths(currentPaths); 
    res.json({success: true, script: newScript}); 
})

app.listen(5001, () => {
    console.log('Backend server running on http://localhost:5001');
})