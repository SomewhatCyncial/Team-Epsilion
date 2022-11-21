const username = document.getElementById("username").value;
const password = document.getElementById('password').value;


// Login Function
function Login(){
    document.getElementById("login").addEventListener('click', async () =>{
        let client = {username: username, password: password};
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