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

User Interface
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
