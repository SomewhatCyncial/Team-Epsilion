/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
async function requestVulnData(ports)
{
    
    const response = await fetch('/vulns/library');

    if(response.ok) {
        const vulnsJson = await response.json();
        return vulnsJson;
    } else {
        window.alert("Error - Response Status: " + response.status);
        return {};
    }
}

async function addVuln(string)
{
    const response = await fetch('/vulns/' + string)

    if(response.ok) {
        console.log("Response: " + response);
        window.alert("New Vulnerabiltiy added successfully");
        location.reload();
    } else {
        window.alert("Error - Response Status: " + response.status);
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

document.getElementById('addVuln').addEventListener("click",async () => {
    let port = document.getElementById("port").value;
    let protocol = document.getElementById("protocol").value;
    let vuln = document.getElementById("vuln").value;


    if(port ==="" || protocol ==="" || vuln ==="") {
        window.alert("Error: All values must be filled out");
    } else {
        if(isNaN(port)) {
            window.alert("Error: Port must be a number");
        } else {
            port = parseInt(port);
            let vulnArray = [];
            vulnArray.push(vuln);
            let string = JSON.stringify({"port": port, "protocol": protocol, "vuln": vulnArray});
            addVuln(string);
        }
    }
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Main
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
async function main() {
    const vulnLibrary = await requestVulnData();
   
    let vulnerabilities = document.getElementById("vulnerabilities")
    let tbody = document.querySelector("tbody");
    tbody.remove();
    tbody = document.createElement("tbody");
    
    vulnLibrary.forEach((x) => {
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
    });
    vulnerabilities.appendChild(tbody);
}
    
main();