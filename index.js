const fs = require("fs/promises");
const express = require("express");
require("dotenv").config()
const {MongoClient} = require('mongodb');
let db = null;

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files
server.use(express.json());

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
server.get("/HostData/hostList", async (req, res) => {
    let hostList = await db.collection('hosts').find().toArray();
    res.json(hostList);
});
// add new Host to hostList Bryan
server.post("/HostData/hostList/new", async (req, res) => {
    let newHost = req.body
    let response = await db.collection("hosts").insertOne(newHost)
    res.json(response);
});
// update a host in hostList Bryan
server.put("/HostData/:_id", async (req, res) => {
    const newHost = req.body
    const _id = req.params._id
    console.log(_id);
    let response = await db.collection("hosts").updateOne({_id},{$set: newHost})
    res.json(response);
});
//delete a host in hostList Bryan
server.delete("/HostData/:_id", async (req, res) => {
    const _id = req.params._id
    let response = await db.collection("hosts").deleteOne({_id})
    res.json(response);
});

//Host Data Page: Returns data for specific host in db
server.get("/HostData/:hostname", async (req, res) => { 
    const hostname = req.params.hostname;
    let response = await (db.collection('hosts').find(hostname));
    res.json(response);
});

async function main() {

    const uri = process.env.MONGODB_URI || process.env.MONGO_DEV_URI;
    const client = new MongoClient(uri);
    try{
        await client.connect()
        db = client.db('enumeration-machine');
        let hostList = await db.collection('hosts').find().toArray();
        server.listen(process.env.PORT || 8080, () => console.log("Server is running"));
    }
    catch(err){
        console.error(err);
    }
}

main();



