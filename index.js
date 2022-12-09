const fs = require("fs/promises");
const express = require("express");
require("dotenv").config()
const {MongoClient} = require('mongodb');
const shodan = "https://api.shodan.io/shodan";
const apiKey = "";
let db = null;

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files
server.use(express.json());

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Webpage Getters - Used to display specific pages
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Login Page
server.get('/login', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine_LoginPage.html');
});

//Home Page
server.get('/EnumerationMachine', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine.html');
});

//Host Data Page
server.get('/hostData', (req , res) => {
    res.sendFile(__dirname +  '/html/hostData.html');
});

//Vuln Library Page
server.get('/vulns', (req , res) => {
    res.sendFile(__dirname +  '/html/hostData.html');
});


/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Login Page APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Host Data APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

// add new Host to hostList - Bryan
server.post("/hostData/hostList/new", async (req, res) => {
    let newHost = req.body;
    let response = await db.collection("hosts").insertOne(newHost);
    res.json(response);
});
// update a host in hostList - Bryan
server.put("/hostData/:_id", async (req, res) => {
    const newHost = req.body
    const _id = req.params._id
    console.log(_id);
    let response = await db.collection("hosts").updateOne({_id},{$set: newHost})
    res.json(response);
});
//delete a host in hostList - Bryan
server.delete("/hostData/:_id", async (req, res) => {
    const _id = req.params._id
    let response = await db.collection("hosts").deleteOne({_id})
    res.json(response);
});

//Host Data Page: Returns list of hosts in db
server.get("/hostData/hostList", async (req, res) => {
    let response = [];
    let currentUser = 'testUser'; //static entry until usernames implemented
    await db.collection('hosts').find({user: currentUser}).forEach((x) => {
        response.push(x['ip']);
    }); // get all hosts created by current user then add their hostname to the response
    res.send(response);
});

//Host Data Page: Returns data for specific host in db
server.get("/hostData/:ip", async (req, res) => { 
    const ip = req.params.ip;
    let response = {}
    console.log(ip);
    await (db.collection('hosts').find({ip: ip})).forEach((x) => { //gets data from mongoDB and saves relevent fields in response
        response['ip'] = x['ip'];
        response['city'] = x['city'];
        response['country'] = x['country'];
        response['latitude'] = x['latitude'];
        response['longitude'] = x['longitude'];
        response['hostnames'] = x['hostnames'];
        response['os'] = x['os'];
        response['org'] = x['org'];
        response['ISP'] = x['ISP'];
        response['ports'] = x['ports'];
    });
    res.json(response);
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Vulnerability Data APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

server.get("/vulns/library", async (req, res) => {
    let response= [];
    await db.collection('vulns').find().forEach((x) => {
        response.push(x);
    });
    res.send(response);
});


/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Shodan Code - Working
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//This function starts a scan of an ip(s) and returns the scan id. - Alex 
//ips is an array of ip values
async function startShodanScan(ips)
{
    ips.toString();
    const response = await fetch(shodan + '/scan?key=' + apiKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'ips= ' + ips
    });

    if(response.ok) {
        const scanData = await response.json(); //JSON object with scan id and number of ips scanned
        let newScan = {ip: ip, scan: scanData.id} // create an new object to store in mongo
        db.collection("scans").insertOne(newScan); //add object to mongo
        return scanData.id; //return id on started scan
    } else {
        //error handling to be implemented
        return null;
    }
}

//This function gets the status of a current Shodan scan using its id. A completed scan will be makred as "DONE" - Alex
async function scanStatus(id)
{
    const response = await fetch(shodan + '/scan/' + id + '?key=' + apiKey)

    if(response.ok) {
        const scanData = await response.json()
        return scanData.status;
    } else {
        //error handling to be implemented
        return null;
    }
}

//After a scan is complete, you can query any relvenet data from Shodan using the ip of the scanned host. This function will return that data. - Alex
//Respones format found on https://developer.shodan.io/api
async function getShodanData(ip)
{
    const response = await fetch(shodan + '/host/' + ip + '?key=' + apiKey);

    if(response.ok) {
        const hostData = await response.json(); //JSON object of host data
        return hostData;
    } else {
        //error handling to be implemented
        return null;
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Main
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

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



