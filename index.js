const fs = require("fs/promises");
const express = require("express");


const url = "https://epsilon-enumeration.herokuapp.com/";

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files

//Login Page
server.get('/', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine_LoginPage.html');
});

//Home Page
server.get('/EnumerationMachine', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine.html');
});

//Host Data Page
server.get('/HostData', (req , res) => {
    res.sendFile(__dirname +  '/html/EnumerationMachine - Host Data.html');
});

//Host Data Page: Returns list of hosts in db
server.get("/HostData/hostList", (req, res) => {
    //let data = JSON.stringify(db.collection('hosts').find().toArray());
    data = JSON.stringify({host_1: 0, host_2: 0, host_3: 0});
    res.send(data);
});

//Host Data Page: Returns data for specific host in db
server.get("/HostData/:hostname", async (req, res) => { 
    const hostName = req.params.hostname;
    //let data = JSON.stringify(db.collection('hosts').find(hostname));

    res.json("Host_1's data was successfully accessed");
});

//Host Data Page: Removes specific host from db
server.delete("/HostData/removeHost", async (req, res) => {

    //hostCollection.deleteOne(
    //    {hostname: req.body.hostname}
    //)
    //.then(result => {
    //   if (result.deletedCount === 0) {
    //        return res.json('No host to delete');
    //    }
    //    res.json('Deleted Host');
    //    })
    //    .catch(error => console.error(error))


});

server.listen(process.env.PORT || 8080, () => console.log("Server is running"));





