const express = require("express");
const session = require('express-session');
const bcrypt = require('bcrypt');
require("dotenv").config()
const {MongoClient, ConnectionPoolReadyEvent} = require('mongodb');
const shodan = "https://api.shodan.io/shodan";
const saltRounds = 10;
let db = null;

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files
server.use(express.json());

//For LoggedIn Autherization
server.use(session({
    secret: 'keep it secret',
    resave: false,
    saveUninitialized: true
  }))

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Webpage Getters - Used to display specific pages
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Login Page
server.get('/', (req , res) => {
    res.sendFile(__dirname + '/html/login.html');
});

server.get('/login', (req , res) => {
    res.sendFile(__dirname + '/html/login.html');
});


//Login Autherization
server.use('/scan', function (req , res , next){
    if (req.session.user !== null) {
        next();
    } else {
        res.redirect('/login');
    }
});

server.use('/hostData', function (req , res , next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
});

server.use('/vulns', function (req , res , next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
});


//Home Page
server.get('/scan', (req , res) => {
    res.sendFile(__dirname + '/html/scan.html');
});

//Host Data Page
server.get('/hostData', (req , res) => {
    res.sendFile(__dirname +  '/html/hostData.html');
});

//Vuln Library Page
server.get('/vulns', (req , res) => {
    res.sendFile(__dirname +  '/html/vulns.html');
});


/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Login Page APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Read and check in the Login Page - Wenxiao
server.post("/login/check", async (req,res) => {
    let credentials = req.body;
    let user = await db.collection("credentials").findOne({username: credentials['username']});
    
    if(!user) {
        res.send({success: false, message: "Invalid Credentials"})
    } else {
        bcrypt.compare(credentials['password'], user['passwordHash'], function(err, result) { 
            if(result) {
                req.session.user = credentials['username'];
                res.send({success: true});
            } else {
                res.send({success: false, message: "Invalid Credentials"})
            }
        });
    }
});

// Sign up - Wenxiao (Adding new client to the login data) 
server.post("/login/register", async (req,res) =>{
    let credentials = req.body;
    let response = await db.collection("credentials").findOne({username: credentials['username']});
    if (!response) {
        let hash = bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(credentials['password'], salt, async function(err, hash) {
                await db.collection("credentials").insertOne({"username": credentials['username'], "passwordHash": hash});
            });
        });
        res.send({success: true, message: "Successfully Registered" })
    } else {
        res.send({success: false, message: "Username Already Exists. Please Try Again"});
    }
});

// Delete a client's login data - Wenxiao
server.get("/logout", async (req, res) => {
    req.session.user = null;
    res.redirect('/login');
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Scan Page APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

server.post("/scan/:ip", async (req, res) => {
    let ip = req.params.ip;
    console.log(ip);
    // let publicIPRegex = /(^0\.)|(^10\.)|(^100\.6[4-9]\.)|(^100\.[7-9]\d\.)|(^100\.1[0-1]\d\.)|(^100\.12[0-7]\.)|(^127\.)|(^169\.254\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.0\.0\.)|(^192\.0\.2\.)|(^192\.88\.99\.)|(^192\.168\.)|(^198\.1[8-9]\.)|(^198\.51\.100\.)|(^203.0\.113\.)|(^22[4-9]\.)|(^23[0-9]\.)|(^24[0-9]\.)|(^25[0-5]\.)/;
    // if(!publicIPRegex.test(ip)){
    //     console.log("invalid IP")
    //     res.json({messsage: "invalid IP"})
    // }
    let response = await ipChecker(ip);
    console.log(response); 
    if(response){
        res.json({message: response});
    }
    else{
        res.json({message: "Error Scan Unsuccessful"})
    }
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Host Data APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Host Data Page: Returns list of hosts in db - Alex
server.get("/hostData/hostList", async (req, res) => {
    let response = [];
    await db.collection('hosts').find({user: req.session.user}).forEach((x) => {
        response.push(x['ip_str']);
    }); // get all hosts created by current user then add their hostname to the response
    res.send(response);
});

//Host Data Page: Returns data for specific host in db - Alex
server.get("/hostData/:ip", async (req, res) => { 
    const ip = req.params.ip;
    let response = {}
    await (db.collection('hosts').find({ip_str: ip})).forEach((x) => { //gets data from mongoDB and saves relevent fields in response
        if(x['ip_str'] !== null) {
            response['ip'] = x['ip_str'];
        } else {
            response['ip'] = "N/A";
        }

        if(x['city'] !== null) {
            response['city'] = x['city'];
        } else {
            response['city'] = "N/A";
        }
        
        if(x['country_name'] !== null) {
            response['country_name'] = x['country_name'];
        } else {
            response['country_name'] = "N/A";
        }

        if(x['latitude'] !== null) {
            response['latitude'] = x['latitude'];
        } else {
            response['latitude'] = "N/A";
        }

        if(x['longitude'] !== null) {
            response['longitude'] = x['longitude'];
        } else {
            response['longitude'] = "N/A";
        }

        if(x['hostnames'] !== null) {
            response['hostnames'] = x['hostnames'];
        } else {
            response['hostnames'] = "N/A";
        }

        if(x['os'] !== null) {
            response['os'] = x['os'];
        } else {
            response['os'] = "N/A";
        }
        

        if(x['org'] !== null) {
            response['org'] = x['org'];
        } else {
            response['org'] = "N/A";
        }
        
        if(x['isp'] !== null) {
            response['isp'] = x['isp'];
        } else {
            response['isp'] = "N/A";
        }
        
        if(x['ports'] !== null) {
            response['ports'] = x['ports'];
        } else {
            response['ports'] = [];
        }
        
    });
    res.json(response);
});

//Removes a specified host from the db
server.get("/hostData/remove/:ip", async (req, res) => {
    const ip = req.params.ip;
    let response = await db.collection("hosts").deleteOne({ip_str: ip});
    res.send(response);
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Vulnerability Data APIs
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

server.get("/vulns/library", async (req, res) => {
    let response= [];
    await db.collection('vulns').find().sort({port: 1}).forEach((x) => {
        response.push(x);
    });
    res.send(response);
});

server.get("/vulns/:string", async (req, res) => {
    const string = req.params.string;
    let obj = JSON.parse(string); //parse string in obj

    let response = await db.collection("vulns").findOne({port: obj['port']}); 
    if(!response) { //if new matching port is found - add a new document tp db
        await db.collection("vulns").insertOne(obj);
    } else { //if a matching port is found
        if(response['protocol'] === obj['vuln'] && response['vuln'].indexOf(obj['vuln'][0]) === -1) { //If matching port is the same protocol
            response['vuln'].push(obj['vuln'][0]);
            await db.collection("vulns").updateOne({port: obj['port']}, { $set: { "vuln" : response["vuln"]}});
        } else { //not the same protocol - add a new document for new protocol
            await db.collection("vulns").insertOne(obj);
        }
    }

    res.send("success");
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Shodan.io Code
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//This function starts a scan of an ip(s) and returns the scan id. - Alex 
//ips is an array of ip values
async function startShodanScan(ip)
{
    ip.toString(); //turn ip in to string
    const response = await fetch(shodan + '/scan?key=' + process.env.API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'ips= ' + ip
    });

    if(response.ok) {
        const scanData = await response.json(); //JSON object with scan id and number of ips scanned
        let newScan = {ip: ip, scan: scanData.id} // create an new object to store in mongo
        await db.collection("scans").insertOne(newScan); //add object to mongo
        return scanData.id; //return id on started scan
    } else {
        //error handling to be implemented
        console.log("scan status not ok")
        return null;
    }
}

//This function gets the status of a current Shodan scan using its id. A completed scan will be makred as "DONE" - Alex
async function scanStatus(id)
{
    const response = await fetch(shodan + '/scan/' + id + '?key=' + process.env.API_KEY)

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
    const response = await fetch(shodan + '/host/' + ip + '?key=' + process.env.API_KEY);

    if(response.ok) {
        const hostData = await response.json(); //JSON object of host data
        return hostData;
    } else {
        console.log("error getting shodan data");
        //error handling to be implemented
        throw new Error("error getting shodan data");
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
// sleep function -Bryan
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function ipChecker(ip){
    try{
        let scanID = await startShodanScan(ip);
        if(scanID === null){
            return null;
        }
        let scanStatusResponse = await scanStatus(scanID);
        let scanCounter = 0;
        while(scanStatusResponse !== "DONE" || scanCounter > 10){
            if(scanStatusResponse !== "DONE"){
                await sleep(2000);
            }
            scanStatusResponse = await scanStatus(scanID);
            console.log(scanStatusResponse);
            scanCounter++;
        }
        let hostData = await getShodanData(ip);
        //check if IP is already in database and replace with new info
        if (hostData){
            hostData['user'] = req.session.user;
            let mongoResponse = await db.collection("hosts").findOneAndUpdate({ip_str: ip}, {$set: hostData}, {upsert:true,new:true});
        }
        return scanStatusResponse;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Main
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function main() {
    const client = new MongoClient(process.env.DB);
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



