//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
//possible IP addresses
// Class A: 10.0.0.0 — 10.255.255.255
// Class B: 172.16.0.0 — 172.31.255.255
// Class C: 192.168.0.0 — 192.168.255.255
function VulnerabilityChecker(){
    document.getElementById("ipCheck").addEventListener('click', () => {
        let startIP = document.getElementById("startIP").value()
        let endIP = document.getElementById("endIP").value()
    })
}
