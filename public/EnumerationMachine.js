//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
//possible IP addresses
let API_KEY = process.env.API_KEY;
// Class A: 10.0.0.0 — 10.255.255.255
// Class B: 172.16.0.0 — 172.31.255.255
// Class C: 192.168.0.0 — 192.168.255.255
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

async function ipChecker(){
    document.getElementById("ipCheck").addEventListener('click', async () => {
        // let startIP = document.getElementById("startIP").value()
        // let endIP = document.getElementById("endIP").value()
        // let ipArray = []
        // ipArray.append(startIP)
        // let IPS = {ips: ipArray};
        const IPS = ["8.8.8.8"];
        const response = await fetch(`https://api.shodan.io/shodan/scan?key=${API_KEY}`,{
            method: 'POST',
            body: JSON.stringify(IPS)
        }).then((res) => res.json());
        // console.log(response);
        // return response;
        if (response.id){
            console.log("Scan Successful");
        }
        else{
            console.log("Scan Failure");
        }

    });
}



async function main() {
    let currentScan = await ipChecker();
   
}

main();