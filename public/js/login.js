/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Functions
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function login(credentials) {
    const response = await fetch('/login/check', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: credentials
    })
    .then(response => response.json())
    .then(result => {
        if(result.success) { 
            window.location.replace('/scan');
        } else {
            window.alert(result.message);
        }
    })
}

async function register(credentials) {
    const response = await fetch('/login/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: credentials
    })
    .then(response => response.json())
    .then(result => {
        if(result.success) { 
            window.alert(result.message)
        } else {
            window.alert(result.message);
        }
    })
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Event Listeners
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

document.getElementById("login").addEventListener('click', async () =>{
    if(document.getElementById("login_username").value === "" || document.getElementById('login_password').value === "") {
        window.alert("Error: All fields must be filled out");
    } else {
        let credentials  = { username: document.getElementById("login_username").value, password: document.getElementById('login_password').value };
        login(JSON.stringify(credentials));
    }
});

document.getElementById("register").addEventListener('click', async () =>{
    if(document.getElementById("login_username").value === "" || document.getElementById('login_password').value === "") {
        window.alert("Error: All fields must be filled out");
    } else {
        let credentials  = { username: document.getElementById("login_username").value, password: document.getElementById('login_password').value };
        register(JSON.stringify(credentials));
    }
});