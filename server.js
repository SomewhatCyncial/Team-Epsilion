//javascript file for server functions
const http = require('http');
const url = require('url');
const fs = require('fs');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname; 
    switch (path){
        // gluing all html pages
    }
});

server.listen(8080);