

async function requestHostList()
{  
    const response = await fetch('/HostData/hostList')

    if(response.ok) {
        const hostJson = await response.json(); //returns JSON object list of hostnames (i.e. {Workstation_1: 0, Workstation_2: 0, ....}) Number values are arbitary
        let hostList = Object.keys(hostJson);
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

//let selectHost = document.getElementById('selectHost');
//selectHost.selectedIndex = 0; //default starting value is "(Select a Host)"
let hostList = await requestHostList();
hostList.forEach((x, index) => {
    //Not sure how to append things to dropdown yet
});

//Event listener for selectHost Dropdown
document.getElementById('selectHost').addEventListener("change",async () => {
    let hostname = document.getElementById('selectHost').value
    const hostData = await requestHostData(hostname);

    let vulnSeverity = document.getElementById("vulnSeverity");
    
    vulnSeverity.innerHTML = `
    <div>
    <p>${hostData.hostname}</p>
    </div>
    `;
});