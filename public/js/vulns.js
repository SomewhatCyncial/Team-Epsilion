/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Request current vulnerability library from db - Alex
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

//Adds user specified db to library - Alex
async function addVuln(string)
{
    const response = await fetch('/vulns/' + string)

    if(response.ok) {
        window.alert("New Vulnerabiltiy added successfully");
        location.reload();
    } else {
        window.alert("Error - Response Status: " + response.status);
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Event Listender for when "Add Vulnerability" is clicked
document.getElementById('addVuln').addEventListener("click",async () => {
    let port = document.getElementById("port").value;
    let protocol = document.getElementById("protocol").value;
    let vuln = document.getElementById("vuln").value;


    if(port ==="" || protocol ==="" || vuln ==="")  { // Verify that the fields have been fileld out by user
        window.alert("Error: All values must be filled out");
    } else { 
        if(isNaN(port)) { //verify that the provided port is a number
            window.alert("Error: Port must be a number");
        } else {
            port = parseInt(port); 
            let vulnArray = [];
            vulnArray.push(vuln);
            let string = JSON.stringify({"port": port, "protocol": protocol, "vuln": vulnArray}); //create object from provided data and strinfy it=
            addVuln(string);
        }
    }
});

document.getElementById("logout").addEventListener('click', async () => {
    await fetch('/logout');
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
        let tr = document.createElement("tr"); //create new row
        let port = document.createElement("th"); //create port column
        let protocol = document.createElement("td"); //create portocol column
        let vuln = document.createElement("td"); // create vuln column
        
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
    });
    vulnerabilities.appendChild(tbody); //append to table header
}
    
main();