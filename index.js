const fs = require("fs/promises");
const express = require("express");
require("dotenv").config()
const {MongoClient} = require('mongodb');
let db = null;

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files
server.use(express.json());

//Login Page
server.get('/login', (req , res) => {
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
    let response = [];
    //let user = req.body;
    let user = 'admin'; //static entry until usernames implemented
    db.collection('hosts').find({user: { $elemMatch: user}}).forEach((x) => {
        response.push(x['host']);
    }); // get all hosts created by current user then add their hostname to the response

    res.json(response);
});

// Read and check in the Login Page - Wenxiao
server.post("/login/check", async (req,res) => {
    let client = req.body;
    const user = client[username];
    const pass = client[password];
    let response = await db.collection("login").find({username : user, password : pass});
    if (response.length === 1){
        console.log("Login Success");
        res.redirect('/EnumerationMachine');
    }
    else{
        console.log("Login Failure");
        res.redirect('/login');
    }
});

// Sign up - Wenxiao (Adding new client to the login data) 
server.post("/login/signup", async (req,res) =>{
    let newClient = req.body;
    let response = await db.collection("credentials").find({username : newClient[username]});
    if (response.length === 0){
        let response2 = await db.collection("credentials").insertOne(newClient);
        console.log('Sign up Success');
    }
    else{
        console.log('Sign up Failure: Username Already Exists');
    }
    res.redirect("/login");
});

// Update a client's login data - Wenxiao
server.put("/login/update", async (req, res) => {
    const newClient = req.body;
    let response = await db.collection("credentials").update({username: newClient[username]}, {$set: newClient});
    res.json(response);
});

// Delete a client's login data - Wenxiao
server.delete("/login/delete", async (req, res) => {
    const _id = req.params._id;
    let response = await db.collection("credentials").deleteOne({_id});
    res.json(response);
});

// add new Host to hostList - Bryan
server.post("/HostData/hostList/new", async (req, res) => {
    let newHost = req.body;
    let response = await db.collection("hosts").insertOne(newHost);
    res.json(response);
});
// update a host in hostList - Bryan
server.put("/HostData/:_id", async (req, res) => {
    const newHost = req.body
    const _id = req.params._id
    console.log(_id);
    let response = await db.collection("hosts").updateOne({_id},{$set: newHost})
    res.json(response);
});
//delete a host in hostList - Bryan
server.delete("/HostData/:_id", async (req, res) => {
    const _id = req.params._id
    let response = await db.collection("hosts").deleteOne({_id})
    res.json(response);
});

//Host Data Page: Returns data for specific host in db
server.get("/HostData/:hostname", async (req, res) => { 
    const hostname = req.params.hostname;
    let response = await (db.collection('hosts').find({host: { $elemMatch: hostname}}));
    res.json(response);
});

async function main() {

    const uri = process.env.MONGODB_URI || process.env.MONGO_DEV_URI;
    const client = new MongoClient(uri);
    try{
        await client.connect()
        db = client.db('enumeration-machine');
        server.listen(process.env.PORT || 8080, () => console.log("Server is running"));
    }
    catch(err){
        console.error(err);
    }
}

main();



