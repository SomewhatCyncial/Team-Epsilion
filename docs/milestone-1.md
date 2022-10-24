Team Name
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Team Epsilon

Project Idea
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Security analysis / Enumeration Tool

Team Overview
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Bryan Kazunas GitHub: BryanKazunas
- Alexander Pratt GitHub: SomewhatCynical
- Wenxiao Zeng GitHub: wzeng-01
 
Innovative Idea
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Our Idea is to build a web-based Security analysis / Enumeration Tool that leverages the concept of browser-based port scanning. The user can provide several parameters for the scan. These include scanning a specific host (i.e.localhost - 127.0.0.1), a range of ports, or exposure to a vulnerability. We would also like to implement scanning based on a range of IPs or DNS names if time and our skillset permit.

The website will ingest information provided by the scan and return a “threat report.” In the case of a host scan, it will detail what ports are open and vulnerable. Subsequent scans will update the “profile” of that workstation to reflect changes. Scans for specific ports or vulnerabilities will return a similar report for that parameter. 

Important Components
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
Some of the main functions we would like to include are:

1. Port scanning: Leveraging socket creations and packet time outs, returning whether or not the port is open 
2. IP parameters: Allowing the user to change the specific target being scanned
3. Vulnerability Analysis, allowing the user to search for susceptible ports for a specific vulnerability
4. Remediation Steps: Provide the user with instructions on how to prevent a port/ports from being susceptible
5. Dynamic Profile: Creating a profile for each new target / updating an existing profile when subsequent scans are run

Time and skillset permitting, we would also like to implement the following,

1. Dynamic Vulnerability Updating: Instead of using a predetermined list, we would somehow dynamically update our vulnerability “database” with new threats (ex., from an external repository)
2. Scan by IP range: add the ability to scan a network of hosts rather than just one specific one
3. Scan by DNS name: add the ability to scan a host using its resolved DNS name and possible extend this to a domain name

User Interface
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

The below image is a wireframe mockup of our home page / new scan creation page. This page will be the inital page seen after login, as well as the location to create a new host scan. At the top is the website header including the site title and nagivation. This
will be uniform across all site pages.The navigation will contain access to new scans, the host database, remediation steps, a search function, and the login/log out selection. Below the site banner will be a text box that will dyncamically pull a news story from an external source regarding new security news to inform the user of any current events (likely from Google's daily security news releases). Below this news section will be the option to create a new system scan. Scans will have several parameters, inclduing the type, range, timeout, and target information. Upon selecting the type of scan, the user will have access to more specific options (for that type of scan) via collapsable areas (labeled "settings" and "advanced"). There is also a button to start the scan.

![home_page_wireframe](/images/home_wireframe.JPG)

The next image is a wireframe mockup of our host data page. Following a scan, a hosts information (i.e scanned ports and found vulnerabilites) will be stored in the database.If its a new host, it will create a new entry. If its an pre-existing host, it will update the current information. A user will be able to select a specific host from a dropdown menu. There is an also an option to edit this host list in order to remove any unwanted hosts from the site. Once a host is selected, its relevent information  will be displayed in two catergories. The first is a pie chart displaying the vulnerabilities breakdown by percentage (ie. Critical - 10%, High - 15%, Medium - 20%, etc...). The second will display a full list of each vulnerability found on the host, including its associated port and description. Both information displays will be filterable by vulnerability level. 

![host_data_wireframe](/images/host_data_wireframe.JPG)

The final image is a wireframe mockup of the login page for the site. This is a simple login page, displaying a users profile picture, as well as the having a prompt for username and password. 

![login_wireframe](/images/login_wireframe.JPG)


Division of Labor
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alex
- Wrote final draft for ideas.md
- Wrote Slack post for "Project Ideas"
- Drew the site wireframe mockup
- Created and coded Enumeration Machnine - Host Data.html
- Wrote milestone-1.md
- Posted milestone-1 github release

Bryan
- 

Wenxiao 
- Created and coded Enumeration Machnine_LoginPage.html
