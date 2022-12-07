/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function requestHostList()
{  
    const response = await fetch('/HostData/hostList')

    if(response.ok) {
        const hostList= await response.json();
        console.log(hostList); //returns JSON object list of hostnames (i.e. {Workstation_1: 0, Workstation_2: 0, ....}) Number values are arbitary
        return hostList;
    } else {
        //error handling to be implemented
        return [];
    }
}

async function removeHost()
{  

}

async function requestHostData(hostname)
{  
    const response = await fetch('/HostData/:' + hostname);

    if(response.ok) {
        const hostJson = await response.json();
        console.log(hostJson);
        return hostJson;
    } else {
        //error handling to be implemented
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Event listener for selectHost Dropdown
document.getElementById('selectHost').addEventListener("change",async () => {
    let hostname = document.getElementById('selectHost').value
    const hostData = await requestHostData(hostname);

    let hostSummary = document.getElementById("hostSummary");
    
    hostSummary.innerHTML = `
    <div>
        <p>
            <br>Host: ${hostData.host}</br> 
            <br></br>
            <br>IP: ${hostData.ip}</br> 
            <br></br>
            <br>Ports: ${hostData.ports}</br> 
            <br></br>
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

