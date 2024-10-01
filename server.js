const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve static files
const serveStaticFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Serve the frontend (HTML, CSS, JS)
    if (req.url === '/') {
        serveStaticFile(res, './public/index.html', 'text/html');
    } else if (req.url === '/script.js') {
        serveStaticFile(res, './public/script.js', 'application/javascript');
    } else if (req.url === '/style.css') {
        serveStaticFile(res, './public/style.css', 'text/css');
    }
    // Serve the questions JSON data
    else if (req.url === '/questions') {
        fs.readFile('./data/questions.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading questions.');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
