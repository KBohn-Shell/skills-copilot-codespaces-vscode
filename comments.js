// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];

http.createServer(function(req, res) {
    // Parse the request URL
    var url_parts = url.parse(req.url, true);
    var path_name = url_parts.pathname;

    // Use a switch statement to determine the response based on the request URL
    switch(path_name) {
        case '/':
            // Load the HTML file
            fs.readFile('./index.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
            break;
        case '/comments':
            // Handle the comments request
            if(req.method === 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });
                req.on('end', function() {
                    var comment = JSON.parse(body);
                    comments.push(comment);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write('Comment added successfully');
                    res.end();
                });
            } else if(req.method === 'GET') {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(comments));
                res.end();
            }
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Page not found');
            res.end();
    }
}).listen(8080);
console.log('Server running at http://localhost:8080/');