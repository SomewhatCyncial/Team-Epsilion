Team Name
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Team Epsilon

Sub Title
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Epsilon Enumeration

Semester
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Fall 2022

Overview
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

For our project, out team created a Security Analysis / Enumeration Tool. The website allows a user to input a specified target IP (must be public) to scan for
for information and potential vulnerabilites. The tool checks for a wide range of data like hostname, organization, lat/long, OS, ISP, and open ports. Our group
also created a database of known vulnerabilites for commonly open ports. These vulnerabilites include types of malware, common attack types. and susceptible protocols.
After a host is scanned, this information is displayed in concise manner on the Host Data page, creating a "Threat Report". User's can also access the entire
preconfigured "Vulnerability Library" via the vulns page, as well as add their own vulnerabilities to it. 

Team Members
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Bryan Kazunas GitHub: BryanKazunas
- Alexander Pratt GitHub: SomewhatCynical
- Wenxiao Zeng GitHub: wzeng-01

User Interface
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Login Page: This page is the initial page a user see's when attempting to access the app (it's also where all un-authenticated redirects go). It allows a user to
sign into the app, or register for a new account.

![login_page](/public/images/login_page.JPG)

Scan Page: This acts as the home page for the app, where users can start a new scan. Users are prompted to enter a IP address (must be public) to scan for
vulnerabilites. There is a navigation bar at the top right which allows users to access the Hosts Page, Vulnerability Library, or Logout.

![scan_page](/public/images/scan_page.JPG)

Host Data Page: This page is were users can review the results of scans they created. It will display a summary of the host data like IP, hostname, OS, etc... as well
as a summary of vulnerabilites based on whats populated in the "Vulnerability Library". There is a "Remove Selected Host" button which allows users to removed the
currenlty selected host from the database. Like the scan page, there is a navigation bar at the top right which allows users to access the Scan Page, Vulnerability Library, or Logout.

![host_data_page](/public/images/host_data_page.JPG)

Vulnerability Library: This page displays all the vulnerabilites currenlty populalating the database. It displays them in ascending order of port, along with associated
protocol and vulnerability / vulnerabilities. There is an "Add Vulnerability" button at the top of the page that allows users to ppopulate a new vulnerability, should
there be one they know off that is not currenlty in the library. As with previous pages, there is a navigation bar at the top right which allows users to access the Scan Page, Host Data Page, or Logout.

![host_data_page](/public/images/vulnerbility_library_page.JPG)

APIs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

Database
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Our team used mongoDB Atlas for out database. Our app uses four collections:

Credentials: This is wear user credentials are stored \
{ \
  username: test, \
  passwordHash: 092wq3u4riuajdhnf \
} \
 
Hosts: This is where scanned host data is stored. \
{ \
  city: "Mountain View" \
  region_code :"CA" \
  os: null \
  tags: Array \
  ip: 134744072 \
  isp: "Google LLC" \
  area_code: null \
  longitude: -122.0775 \ 
  last_update: "2022-12-11T05:53:49.844289" \
  ports: Array \
  latitude: 37.4056 \
  hostnames: Array \
  country_code: "US" \
  country_name: "United States" \
  domains: Array \
  org: "Google LLC" \
  data: Array \
  asn: "AS15169" \
  ip_str: "8.8.8.8" \
} \

scans: This is where the ip of a scanned host and its assocaied scan idea are saved \

{ \
  ip: "8.8.8.8" \
  scan: "tW5qN2N7aot9VzdS" \
} \

vulns: This is were all the currenlty reconginzed vulnerabilites are saved \
{ \
  port: 20 \
  protocol: TP" \
  vuln: ray \
    0: Brute Forcing Passwords" \
    1: "Anonymous Authentication" \
    2: "Cross-site Scripting" \
    3: "Directory Traversal" \
    4: "Amanda Trojan" \
    5: "Senna Spy FTP" \
 } \

Routes
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Webpage Getters
- '/login': Get's login.html
- '/scan': Get's scan.html
- '/hostData': Get's hostData.html
- '/vulns': Gets vuln.html

Login Routes (These are the only routes available to unauthetnicated users)
- /login/check: Verifies that credentials being used to login are valid
- /login/register: Create's an account for a new user if the credientials don't exist yet
- /logout: Logout the current user and return to login page

Scan Page Routes
- /scan/:ip: Initaties a scan using a provided ip. Sends data to Shodan.io and gets response. Waits for scan to complete and saves hostData in db. If the host already exists it updates the existing document, otherwise it creates a new one

Host Data Routes
- /hostData/hostList: Returns a list of the current hosts in the database. This is used to update the selection drop down on the Host Data page
- /hostData/:ip: This queries the database for the data for a specific host (via ip). This information is used to populate the "Host Summary" section on the Host Data page
- /hostData/remove/:ip: This removes the specified host from the database along with all associated info

Vulnerability Library Routes
- /vulns/library: This returns a list of everu vulnerability currently in the library. This information is used to populate the "Vulnerability library" section on the Vulnerability Library page
- /vulns/:string: This takes a user specified vulnerability and adds it to the libarary

Authentication / Authorization
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Our website supports simnple login / register functionality. When a user first accesses the site, they must register for an account. Wehn entering their credentials, it is verified that the username is unqiue before creating the account. These credentials are salted, hashed, and then stored in our mongoDB. When a returning user attempts to login, their credentials are verified by comparing the provided username to the list of accounts, and comparing the provided password's hash with the stored password hash. If they match the user is granted access. Their are no unique views on the site, but user's can only see data from scans they initiated. Their is not "admin permission" account.


Division of Labor
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Alex
- Wrote final draft for ideas.md
- Wrote Slack post for "Project Ideas"
- Drew the site wireframe mockup
- Created and coded hostData.html
- Wrote milestone-1.md
- Posted milestone-1 github release
- Created and configured Heroku app
- Took Wenxiao's server.js code and converted it in an express app in index.js code
- Created the right side of the application flow diagram
- Added code to Enumeration Machnine - Host Data.html to reflect required fields for CRUD updates
- Created and coded hostData.js
- Wrote milestone-2.md
- Posted milestone-2 github release
- Wrote milestone3.md
- Create MongoDB database and attached it to Heroku and Github
- Assisted in creation of data formats and created relevent collections in MongoDB
- Assisted in database coding for APIs used by Host Data webpage
- Standardized prexisting code to match format implemented by Bryan
- Created and coded vulns.html
- Created and coded vulns.js
- Coded intial Shodan.io integeration
- Coded mongoDB Atlas intetgration for hostData.js, vuln.js, and login.js
- Coded login.js to create site authentication functionality
- Updated all .html files to have consitent UI apperance
- Wrote final.md
- Created project video

Bryan
- Wrote rought draft of ideas.md
- Created and coded EnumerationMachine.html
- Created flow chart for Shodan API
- Created mongodb database
- Added function to EnumerationMachine.html
- Updated EnumerationMachine.html
- Wrote setup.md
- Made CRUD operations for host data in server
- wrote code that connected server to mongo database
- Assisted in creation of data formats and created relevent collections in MongoDB
- Assisted in database coding for APIs used by Host Data webpage
- wrote/coded scan.js
- Integrated the scan feature on the website
- ensured scan data gets updated and stored
- adjusted data from shodan to be user specific for the website
- added voice input to final video

Wenxiao 
- Created and coded Enumeration Machnine_LoginPage.html
- Created the initial server.js file (converted into an express app in index.js by Alex)
- Wrote the login page into the flow chart
- Solved the bug that images cannot be displayed correctly in the index.js file
- Made CRUD operations for the login page in server
- Create the release
- Assisted in database coding for APIs used by Login webpage 

Conclusion
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

For our project, our team wanted to create a security analysis/enumeration tool that allows users to scan hosts remotely for open ports and provide their associated vulnerabilities. Initially, we wanted to enable the user to scan via a single IP, range of IPs, or target port. These scans would then return a threat report and display an overview of a host and its related vulnerabilities. Due to restrictions with node.js and our collective technical knowledge, we had to limit some of the site's functionality. Despite this, our project still reflects most of our initial goals. 

As our group learned, javascript is very limited when accessing remote hosts via anything past a typical web connection (even to test if the port is open). It would require us to rely on timeouts to determine a port’s state, which is questionable at best. To counter this, our group decided to incorporate an external API called Shodan.io, which extends javascript’s base functionality and provides more tools to suit our needs. This created a new problem, as Shodan only allows a certain number of scans per month and doesn't allow scans based on specific ports. This required us to restrict our site to only scan one host at a time to save on our scan “credits” and remove targeted port scanning altogether. We also decided to remove the “remediation guidance” aspect because, in almost all cases, the guidance would be “close the port.” We added the ability to reference a “Vulnerability Database” to replace it, which can be updated by the user to reflect new vulnerabilites.  

Overall, our team learned a lot about the limitations of node.js, and came up with some interesting and effective ways to work around those shortcomings. While the final product isn't as versetile as we orignally set out for it be, it maintains the ability to do almost everything we initally wanted. 

