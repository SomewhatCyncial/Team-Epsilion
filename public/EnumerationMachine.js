//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
//possible IP addresses
let API_KEY = "ch4OqIt7AqwXvkB4uxvyL3x0HujgUJxY";//process.env.API_KEY;
const shodan = "https://api.shodan.io/shodan";
// Class A: 10.0.0.0 — 10.255.255.255
// Class B: 172.16.0.0 — 172.31.255.255
// Class C: 192.168.0.0 — 192.168.255.255

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function startShodanScan(ips)
{
    ips.toString();
    const response = await fetch(shodan + '/scan?key=' + API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'ips= ' + ips
    });

    if(response.id) {
        const scanData = await response.json(); //JSON object with scan id and number of ips scanned
        let newScan = {ip: ip, scan: scanData.id} // create an new object to store in mongo
        db.collection("scans").insertOne(newScan); //add object to mongo
        return scanData.id; //return id on started scan
    } else {
        //error handling to be implemented
        return null;
    }
}

async function scanStatus(id)
{
    const response = await fetch(shodan + '/scan/' + id + '?key=' + apiKey)

    if(response.status) {
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

    if(response.ip) {
        const hostData = await response.json(); //JSON object of host data
        return hostData;
    } else {
        //error handling to be implemented
        return null;
    }
}

async function ipChecker(){
    document.getElementById("ipCheck").addEventListener('click', async () => {
        let ip = document.getElementById("targetIP").value()
        // let endIP = document.getElementById("endIP").value()
        // let ipArray = []
        // ipArray.append(startIP)
        // let IPS = {ips: ipArray};
        const IPS = ["8.8.8.8"];
        let scanID = startShodanScan(IPS);
        let scanStatus = scanStatus(scanID);
        while(scanStatus !== "DONE"){
            await sleep(5000);
            scanStatus = scanStatus(scanID);
        }
        hostData = getShodanData(IPS);
        //check if IP is already 
        db.collection("hosts").insertOne(hostData);
        // const response = await fetch(`https://api.shodan.io/shodan/scan?key=${API_KEY}`,{
        //     method: 'POST',
        //     body: 'ips= ' + IPS
        // }).then((res) => res.json());
        // // console.log(response);
        // // return response;
        // if (response.id){
        //     console.log("Scan Successful");
        // }
        // else{
        //     console.log("Scan Failure");
        // }

    });
}



async function main() {
    const uri = process.env.MONGODB_URI || process.env.MONGO_DEV_URI;
    const client = new MongoClient(uri);
    try{
        await client.connect()
        db = client.db('enumeration-machine');
    }
    catch(err){
        console.error(err);
    }

    let currentScan = await ipChecker();
   
}

main();