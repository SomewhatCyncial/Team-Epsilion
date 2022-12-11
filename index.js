const { response } = require("express");
const express = require("express");
const session = require('express-session')
require("dotenv").config()
const {MongoClient, ConnectionPoolReadyEvent} = require('mongodb');
const shodan = "https://api.shodan.io/shodan";
const apiKey = process.env.API_KEY;
let db = null;

const server = express();
server.use(express.static(__dirname + '/public')); //allows import of .css files
server.use(express.json());

// For LoggedIn Autherization
server.use(session({secret:'Keep it secret'
,name:'uniqueSessionID'
,saveUninitialized:false}))

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Webpage Getters - Used to display specific pages
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Login Page
server.get('/', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine_LoginPage.html');
});

server.get('/login', (req , res) => {
    res.sendFile(__dirname + '/html/EnumerationMachine_LoginPage.html');
});

//Login Autherization
server.use('/EnumerationMachine', function (req , res , next){
    if (req.session.loggedIn){
        next();
    }
    else{
        res.redirect('/login');
    }
});

server.use('/hostData', function (req , res , next){
    if (req.session.loggedIn){
        next();
    }
    else{
        res.redirect('/login');
    }
});

server.use('/vulns', function (req , res , next){
    if (req.session.loggedIn){
        next();
    }
    else{
        res.redirect('/login');
    }
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
    res.sendFile(__dirname +  '/html/vulns.html');
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
        req.session.loggedIn = true;
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
        req.session.loggedIn = true;
        console.log('Sign up Success');
        res.redirect("/EnumerationMachine");
    }
    else{
        console.log('Sign up Failure: Username Already Exists');
    }
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
        if(x['ip'] !== undefined) {
            response['ip'] = x['ip'];
        } else {
            response['ip'] = "N/A";
        }

        if(x['city'] !== undefined) {
            response['city'] = x['city'];
        } else {
            response['city'] = "N/A";
        }
        
        if(x['country_name'] !== undefined) {
            response['country_name'] = x['country_name'];
        } else {
            response['country_name'] = "N/A";
        }

        if(x['latitude'] !== undefined) {
            response['latitude'] = x['latitude'];
        } else {
            response['latitude'] = "N/A";
        }

        if(x['longitude'] !== undefined) {
            response['longitude'] = x['longitude'];
        } else {
            response['longitude'] = "N/A";
        }

        if(x['hostnames'] !== undefined) {
            response['hostnames'] = x['hostnames'];
        } else {
            response['hostnames'] = "N/A";
        }

        if(x['os'] !== undefined) {
            response['os'] = x['os'];
        } else {
            response['os'] = "N/A";
        }
        

        if(x['org'] !== undefined) {
            response['org'] = x['org'];
        } else {
            response['org'] = "N/A";
        }
        
        if(x['isp'] !== undefined) {
            response['isp'] = x['isp'];
        } else {
            response['isp'] = "N/A";
        }
        
        if(x['ports'] !== undefined) {
            response['ports'] = x['ports'];
        } else {
            response['ports'] = [];
        }
        
    });
    res.json(response);
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


/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Shodan Code - Working
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
// sleep function -Bryan
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
//This function starts a scan of an ip(s) and returns the scan id. - Alex 
//ips is an array of ip values
async function startShodanScan(ip)
{
    ip.toString();
    const response = await fetch(shodan + '/scan?key=' + apiKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'ips= ' + ip
    });

    if(response.ok) {
        const scanData = await response.json(); //JSON object with scan id and number of ips scanned
        //console.log(scanData);
        let newScan = {ip: ip, scan: scanData.id} // create an new object to store in mongo
        await db.collection("scans").insertOne(newScan); //add object to mongo
        //console.log(mongoResponse);
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
    const response = await fetch(shodan + '/scan/' + id + '?key=' + apiKey)

    if(response.ok) {
        const scanData = await response.json()
        return scanData.status;
    } else {
        console.log(response);
        //error handling to be implemented
        return null;
    }
}

//After a scan is complete, you can query any relvenet data from Shodan using the ip of the scanned host. This function will return that data. - Alex
//Respones format found on https://developer.shodan.io/api
async function getShodanData(ip)
{
    console.log(ip);
    const response = await fetch(shodan + '/host/' + ip + '?key=' + apiKey);

    if(response.ok) {
        const hostData = await response.json(); //JSON object of host data
        //console.log(hostData);
        return hostData;
    } else {
        console.log("error getting shodan data");
        //error handling to be implemented
        throw new Error("error getting shodan data");
    }
}

async function ipChecker(ip){
    try{
        //const testData = await getShodanData(ip);
        //console.log(testData);
        let scanID = await startShodanScan(ip);
        //console.log("scanID: ", scanID);
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
        const hostData = await getShodanData(ip);
        //check if IP is already in database and replace with new info
        // let ipInMongo = await db.collection("hosts").findOne({ip})
        // console.log(ipInMongo);

        if (hostData){
            //console.log("ip for Mongo: ", ip);
            let mongoResponse = await db.collection("hosts").findOneAndUpdate({ip_str: ip}, {$set: hostData}, {upsert:true,new:true});
            //console.log(mongoResponse);
        }
        return scanStatusResponse;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

server.post("/enumerationmachine/:ip", async (req, res) => {
    let ip = req.params.ip;
    console.log(ip);
    // let publicIPRegex = /(^0\.)|(^10\.)|(^100\.6[4-9]\.)|(^100\.[7-9]\d\.)|(^100\.1[0-1]\d\.)|(^100\.12[0-7]\.)|(^127\.)|(^169\.254\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.0\.0\.)|(^192\.0\.2\.)|(^192\.88\.99\.)|(^192\.168\.)|(^198\.1[8-9]\.)|(^198\.51\.100\.)|(^203.0\.113\.)|(^22[4-9]\.)|(^23[0-9]\.)|(^24[0-9]\.)|(^25[0-5]\.)/;
    // if(!publicIPRegex.test(ip)){
    //     console.log("invalid IP")
    //     res.json({messsage: "invalid IP"})
    // }
    let response =await ipChecker(ip);
    console.log(response); 
    if(response){
        res.json({message: response});
    }
    else{
        res.json({message: "Error Scan Unsuccessful"})
    }
});


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



