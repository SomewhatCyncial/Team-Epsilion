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

async function removeHost()
{  

}

async function requestHostData(ip)
{  
    console.log(ip);
    const response = await fetch('/HostData/' + ip);

    if(response.ok) {
        const hostJson = await response.json();
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
    let ip = document.getElementById('selectHost').value
    const hostData = await requestHostData(ip);

    let hostSummary = document.getElementById("hostSummary");
    
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

