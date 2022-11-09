const fs = require("fs/promises");
const express = require("express");

const server = express();

server.get('/', (req , res) => {
    res.sendFile('/EnumerationMachine_LoginPage.html');
  });

server.get('/EnumerationMachine', (req , res) => {
    res.sendFile('/EnumerationMachine.html');
});

server.get('/results', (req , res) => {
    res.sendFile('/EnumerationMachine - Host Data.html');
});

server.get("/hostList", (req, res) => {
    res.json({Host_1: 0, Host_2: 0, Host_3: 0}); //hard coded response to take place of dynamic data

});

server.get("/hostData/:hostname", async (req, res) => { 
    const hostName = req.params.hostname;
    let data;

    try{
        data = await fs.readFile('data/hostData/$(hostName).txt', "utf-8");
    } catch {
        //error handling
    }

    res.json({ 
        data 
    });

});

server.post("/removeHost", async (req, res) => {

    const removeHost = req.body.content;

    if(!content)
        //error handling
    
    //Implement code to remove host from database
    
    res.send("Host Removed");
});
server.listen(process.env.PORT || 8080, () => console.log("Server is running"));

