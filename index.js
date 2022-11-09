const fs = require("fs/promises");
const express = require("express");

const server = express();

server.use(express.static(__dirname + '/public'));

server.get('/', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine_LoginPage.html');
  });

server.get('/EnumerationMachine', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine.html');
});

server.get('/results', (req , res) => {
    res.sendFile(__dirname +  '/html/EnumerationMachine - Host Data.html');
});

server.get("/hostList", (req, res) => {
    window.alert("{Host_1: 0, Host_2: 0, Host_3: 0}");
    res.json({Host_1: 0, Host_2: 0, Host_3: 0}); //hard coded response to take place of dynamic data until implemented

});

server.get("/hostData/:hostname", async (req, res) => { 
    const hostName = req.params.hostname;
    let data;

    try{
        data = await fs.readFile(__dirname +  'data/hostData/' + hostname + '.txt', "utf-8");
    } catch {
        //error handling
    }

    window.alert("{Host_1: 0, Host_2: 0, Host_3: 0}");
    res.json({ 
        
        data 
    });

});

server.post("/removeHost", async (req, res) => {

    const removeHost = req.body.content;

    if(!content)
        //error handling
    
    //Implement code to remove host from database
    fs.unlink('data/hostData/' + content + '.txt')
    window.alert("removed host")

    
    res.send("Host Removed");
});
server.listen(process.env.PORT || 8080, () => console.log("Server is running"));

