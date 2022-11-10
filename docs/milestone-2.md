APIs
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
***HTML Webpage APIS

server.get('/'): loads login page
server.get('/EnumerationMachine'): loads main page (scan page)
erver.get('/HostData'): loads Host Data page

***APIs used by Enumeration Machine - Login

***APIs used by Enumeration Machine

***APIs used by Enumeration Machine - Host Data.js

server.get("/HostData/hostList"): returns a list of all hosts currently in the database. Used to update "Select A Host" dropdown button on page load (not yet                                             implemented)
server.get("/HostData/:hostname"): returns the relevent data for a specific host in the database
server.delete("/HostData/removeHost"): removes a specified host from the databse


Screenshots
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Heroku link
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

https://epsilon-enumeration.herokuapp.com/

Division of Labor
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alex
- Created  and configured Heroku app
- Took Wenxiao's server.js code and converted it in an express app in index.js code
- Created the rights side of the application flow diagram
- Added code to Enumeration Machnine - Host Data.html to reflect required fields for CRUD updates
- Coded hostData.js
- Posted milestone-1 github release

Bryan
- Wrote rought draft of ideas.md
- Created and coded EnumerationMachine.html

Wenxiao 
- Created and coded Enumeration Machnine_LoginPage.html
