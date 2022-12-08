//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
//possible IP addresses
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

async function ipChecker(){
    document.getElementById("ipCheck").addEventListener('click', async () => {
        // let startIP = document.getElementById("startIP").value()
        // let endIP = document.getElementById("endIP").value()
        // let ipArray = []
        // ipArray.append(startIP)
        // let IPS = {ips: ipArray};
        let API_KEY = "ch4OqIt7AqwXvkB4uxvyL3x0HujgUJxY"
        const IPS = ["8.8.8.8"];
        const response = await fetch(`https://api.shodan.io/shodan/scan?key=${API_KEY}`,{
            method: 'POST',
            body: JSON.stringify(IPS)
        }).then((res) => res.json());
        // console.log(response);
        // return response;
        if (response.ok){
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