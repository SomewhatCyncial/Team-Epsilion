//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
function VulnerabilityChecker(){
    document.getElementById("VulnerabilityCheck").addEventListener('click', () => {
        let ip = document.getElementById("targetIP").value()
        let start = document.getElementById("startPort").value()
        let end = document.getElementById("endPort").value()
        let scanResults = document.getElementById("scanResults");
        let newDiv = document.createElement("div");
        scanResults.innerHTML = "";
        newDiv.innerHTML = "Target IP: " + ip + " Start Port: " + start + " End Port: " + end;
        scanResults.appendChild(newDiv);
        newDiv.classList.add(scanResults);
    })
}
