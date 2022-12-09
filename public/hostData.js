const vulnLibrary = await requestVulnData();

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function requestHostList()
{  
    const response = await fetch('/HostData/hostList')

    if(response.ok) {
        const hostList= await response.json();
        return hostList;
    } else {
        //error handling to be implemented
        return [];
    }
}

async function requestHostData(ip)
{  
    const response = await fetch('/HostData/' + ip);

    if(response.ok) {
        const hostJson = await response.json();
        return hostJson;
    } else {
        //error handling to be implemented
    }
}

async function requestVulnData(ports)
{
    
    const response = await fetch('/vulns/library');

    if(response.ok) {
        const vulnsJson = await response.json();
        return vulnsJson;
    } else {
        //error handling to be implemented
    }
}

async function removeHost()
{  

}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Event listener for selectHost Dropdown
document.getElementById('selectHost').addEventListener("change",async () => {
    let ip = document.getElementById('selectHost').value
    const hostData = await requestHostData(ip);

    let hostSummary = document.getElementById("hostSummary");
    let vulnSummary = document.getElementById("vulnSummary");

    let tbody = document.querySelector("tbody");
    tbody.remove();
    tbody = document.createElement("tbody");
    vulnLibrary.forEach((x) => {
        if(hostData['ports'].indexOf(x['port']) !== -1) {
            let tr = document.createElement("tr");
            let port = document.createElement("th");
            let protocol = document.createElement("td");
            let vuln = document.createElement("td");
            
            port.scope = "row";
            port.innerHTML = x['port'];
            protocol.innerHTML = x['protocol'];

            tr.appendChild(port);
            tr.appendChild(protocol);

            if(x['vuln'].length >= 1) {
                vuln.innerHTML = x['vuln'][0];
                tr.appendChild(vuln);
                tbody.appendChild(tr);

                for(let i = 1; i < x['vuln'].length; i++) {
                    let newtr = document.createElement("tr");
                    let emptyPort = document.createElement("th");
                    let emptyProtocol = document.createElement("td");
                    let nextVuln = document.createElement("td");

                    port.scope = "row";
                    nextVuln.innerHTML = x['vuln'][i];

                    newtr.appendChild(emptyPort);
                    newtr.appendChild(emptyProtocol);
                    newtr.appendChild(nextVuln);
                    tbody.appendChild(newtr);
                }
            } else {
                tr.appendChild(vuln);
                tbody.appendChild(tr);
            }
        }
    });
    vulnSummary.appendChild(tbody);
    
    hostSummary.innerHTML = `
    <div>
        <p class = "text-left">
            <br>IP: ${hostData['ip']}</br> 
            <br>City: ${hostData['city']}</br> 
            <br>Country: ${hostData['country_name']}</br>
            <br>Lat / Long: ${hostData['latitude']}, ${hostData['longitude']} </br>
            <br>Host: ${hostData['hostnames']}</br>
            <br>OS: ${hostData['os']}</br>  
            <br>Org: ${hostData['org']}</br> 
            <br>ISP: ${hostData['isp']}</br> 
        </p>
    </div>
    `;
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Main
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function main() {
    let hostList = await requestHostList();
    const select = document.getElementById('selectHost');
    hostList.forEach((x) => {
        let opt = document.createElement('option');
        opt.innerHTML = x;
        select.appendChild(opt);
    });
}

main();

