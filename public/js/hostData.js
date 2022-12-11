const vulnLibrary = await requestVulnData();

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Get list of Hosts from db -Alex
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

//Get data for specified host - Alex
async function requestHostData(ip)
{  
    const response = await fetch('/hostData/' + ip);

    if(response.ok) {
        const hostData= await response.json();
        return hostData;
    } else {
        window.alert("There was an error. Response.status: " + response.status);
        return {};
    }
}

//Removed specified host from db - Alex
async function removeHost(ip)
{  
    const response = await fetch('/hostData/remove/' + ip);
    
    if(response.ok) {
        location.reload();
        window.alert(ip + " was succesfully removed")
    } else {
        window.alert("Error - Response.status: " + response.status);
        return {};
    }
}

//Get vulnerbilites for specified host - Alex
async function requestVulnData(ports)
{
    const response = await fetch('/vulns/library');

    if(response.ok) {
        const vulnsJson = await response.json();
        return vulnsJson;
    } else {
        window.alert("Error - Response.status: " + response.status);
        return {};
    }
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

    //For each vulnerability in the library, check if host is susceptible
    vulnLibrary.forEach((x) => {
        if(hostData['ports'].indexOf(x['port']) !== -1) { //if the hosts open port exists in the library
            let tr = document.createElement("tr"); //create row
            let port = document.createElement("th"); //create port column
            let protocol = document.createElement("td"); //create protocol column
            let vuln = document.createElement("td"); //create vuln column
            
            port.scope = "row";
            port.innerHTML = x['port']; //set values
            protocol.innerHTML = x['protocol'];

            //append to new row
            tr.appendChild(port);
            tr.appendChild(protocol);

            if(x['vuln'].length >= 1) { //if there is more then on vuln for the port
                vuln.innerHTML = x['vuln'][0];
                tr.appendChild(vuln); //append to row
                tbody.appendChild(tr); //append row to table

                //For each additional vuln, create empty port / protocol columns and append them to a new row
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
    vulnSummary.appendChild(tbody); //append to table header
     
    //Create html to be added to hostSummary text box
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

//Event Listener for when "Edit Host List" is clicked
document.getElementById('editHostList').addEventListener("click",async () => {
    let ip = document.getElementById('selectHost').value
    removeHost(ip);
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

