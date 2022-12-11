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
        //error handling to be implemented
    }
}

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