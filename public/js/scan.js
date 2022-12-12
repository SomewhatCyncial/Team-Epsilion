//vulnerability check button (implemented By Bryan)


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
            alert("Shodan had an error when trying to scan this IP");
        }

    });
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
document.getElementById("logout").addEventListener('click', async () => {
    await fetch('/logout');
});


async function main() {
    let currentScan = await ipChecker();
}

main();
