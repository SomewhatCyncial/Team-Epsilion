 //javascript file for server functions
const http = require('http');
const url = require('url');
const fs = require('fs');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname; 
    switch (path){
        // gluing all html pages
        case '/':  
            response.writeHead(200, {  
                'Content-Type': 'text/plain'  
            });  
            response.write("This is Test Message.");  
            response.end();  
            break;
        // Login Page
        case '/login':
            fs.readFile('./EnumerationMachine_LoginPage.html',function(error,data){
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    response.write(data);  
                    response.end();  
                }
            });
            break;
        
        // Calling the main.css file
        case '/main.css':
            fs.readFile('./main.css',function(error,data){
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/css'  
                    });  
                    response.write(data);  
                    response.end();  
                }
            });
            break;
        default:  
            response.writeHead(404);  
            response.write("Page does not exist.");  
            response.end();  
            break;
    }
});

server.listen(8080);