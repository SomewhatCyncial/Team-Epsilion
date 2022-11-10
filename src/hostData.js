const url = "https://epsilon-enumeration.herokuapp.com/HostData";

async function requestHostList()
{  
    const response = await fetch(url + '/HostData/hostList')

    if(response.ok) {
        const hostJson = await response.json(); //returns JSON object list of hostnames (i.e. {Workstation_1: 0, Workstation_2: 0, ....}) Number values are arbitary
        let hostList = Object.keys(hostJson);
        return hostList;
    } else {
        //error handling to be implemented
        window.alert("failed to return hostList")
    }
}

async function removeHost()
{  

}

async function requestHostData(hostname)
{  
    const response = await fetch('/:' + hostname)

    if(response.ok) {
        const hostJson = await response.json();
        return hostJson;
    } else {
        //error handling to be implemented
        window.alert("failed to return hostData")
    }
}

//let selectHost = document.getElementById('selectHost');
//selectHost.selectedIndex = 0; //default starting value is "(Select a Host)"
let hostList = requestHostList();
hostList.forEach((x, index) => {
    //Not sure how to append things to dropdown yet
});

//Event listener for selectHost Dropdown
document.getElementById('selectHost').addEventListener("change", () => {
    let hostname = document.getElementById('selectHost').value
    const hostData = requestHostData(hostname);

    let vulnSeverity = document.getElementById("vulnSeverity");
    
    vulnSeverity.innerHTML = hostData;
});