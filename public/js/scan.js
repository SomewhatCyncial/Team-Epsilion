//vulnerability check button (implemented By Bryan) I'm not checking to see of any input is correct or anything yet
//possible IP addresses
// Class A: 10.0.0.0 — 10.255.255.255
// Class B: 172.16.0.0 — 172.31.255.255
// Class C: 192.168.0.0 — 192.168.255.255


async function ipChecker(){
    document.getElementById("ipCheck").addEventListener('click', async () => {
        let ip = document.getElementById("targetIP").value
        if(!ip){
            alert("Enter valid IP");
            return;
        }
        let response = await fetch(`/scan/${ip}`, {
            method: "POST",
        })
        let data = await response.json();
        console.log(data);
        if (data.message === "DONE"){
            alert("Scan successful");
            location.reload();
        }
        else{
            alert("Scan unsuccessful");
        }

    });
}



async function main() {
    let currentScan = await ipChecker();
   
}

main();