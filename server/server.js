const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/api/history') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(fs.readFileSync('pawnrush.history', 'utf8').split('\r\n')));
    } else {
        res.statusCode = 404;
        res.end();
    }
  
}).listen(8080, 'localhost');
