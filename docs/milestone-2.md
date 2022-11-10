APIs
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
***HTML Webpage APIS

- server.get('/'): loads login page
- server.get('/EnumerationMachine'): loads main page (scan page)
- server.get('/HostData'): loads Host Data page

***APIs used by Enumeration Machine - Login

***APIs used by Enumeration Machine

***APIs used by Enumeration Machine - Host Data.js

- server.get("/HostData/hostList"): returns a list of all hosts currently in the database. Used to update "Select A Host" dropdown button on page load (not yet         implemented)
- server.get("/HostData/:hostname"): returns the relevent data for a specific host in the database
- server.delete("/HostData/removeHost"): removes a specified host from the databse

![Group 12](https://user-images.githubusercontent.com/112918640/200991389-1b6681e0-f35d-47ae-9435-8936118cabd0.png)
![Group 13](https://user-images.githubusercontent.com/112918640/200991411-79cc0d03-de33-4e70-9c8e-c46316d49f69.png)

Screenshots
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
Our group was unable to get out CRUD functions to work properly. We implemented out index.js and tried to send and recieve data to our client.js files, but were unable to update out HTML pages using it. We will continue to try and implment functionality over the coming days. Hopefully the lectures will shed some light on what we are doing wrong. 

Heroku link
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

https://epsilon-enumeration.herokuapp.com/

Division of Labor
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alex
- Created  and configured Heroku app
- Took Wenxiao's server.js code and converted it in an express app in index.js code
- Created the right side of the application flow diagram
- Added code to Enumeration Machnine - Host Data.html to reflect required fields for CRUD updates
- Coded hostData.js
- Wrote milestone-2.md
- Posted milestone-2 github release

Bryan
- Created flow chart for Shodan API
- Created mongodb database
- Added function to EnumerationMachine.html
- Updated EnumerationMachine.html
- Wrote setup.md

Wenxiao 
(Weniao to update)
