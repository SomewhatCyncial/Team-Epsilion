const username = document.getElementById("login_username").value;
const password = document.getElementById('login_password').value;
const reg_user = document.getElementById("reg_username").value;
const reg_pass = document.getElementById('reg_password').value;

// For account password encryption
const crypto = require('crypto');

// Login Function
function Login(){
    document.getElementById("login").addEventListener('click', async () =>{
        let client = {username: username, password: crypto.createHash('sha256').update(password).digest('hex')};
        const response = await fetch('/login/check',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        });
        
        if (response.ok){
            console.log("Login Success");
        }
        else{
            console.log("Login Failure");
        }

    });
}

function Register(){
    document.getElementById("register").addEventListener('click', async () =>{
        let client = {username: reg_user, password: crypto.createHash('sha256').update(reg_pass).digest('hex')};
        const response = await fetch('/login/signup',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        });
        
        if (response.ok){
            console.log("Register Success");
        }
        else{
            console.log("Register Failure");
        }

    });
}