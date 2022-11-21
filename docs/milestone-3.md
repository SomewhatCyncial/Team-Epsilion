Database Documentation
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Our project is using a MongoDB database hosted by MongoDB Atlas. It currently has three collections being used to store information (more may be added if required and the timeline permits. They're formatting and purpose are as follows:

Hosts: This will hold all relevent data pertaining to a host that has been scanned. These inclued the identifier (hostname), the ip address, any open ports, scan_ids (provided by SHODAN), and the user that initiated the scan (this will be used to determine what host information a user has access to).

  { host: "name", ip: "0.0.0.0", ports: [], scans: [], user: "", }

Vulns: This will be a collection of know vulnerabilites and their associated ports. For example, RDP uses port 3389. If this port is found open to the internet, it could be exploloited for an RDP connection. Any scans that assoicate this port with a host can query this collection for relevent vulnerabilites.

  { vuln: "Example", ports: [1,2,3,4] }

Credentials: This will hold the credrentials of registered users

  { username: "testUser", password: test } <- these values will be hashes

Division of Labor
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alex

- Wrote milestone3.md
- Create MongoDB database and attached it to Heroku and Github
- Assisted in creation of data formats and created relevent collections in MongoDB
- Assisted in database coding for APIs used by Host Data webpage
- Standardized prexisting code to match format implemented by Bryan
- Minor formatting change ins hostData.html

Bryan

- Made CRUD operations for host data in server
- wrote code that connected server to mongo database
- Assisted in creation of data formats and created relevent collections in MongoDB
- Assisted in database coding for APIs used by Host Data webpage

Wenxiao 
- Made CRUD operations for the login page in server
- Create the release
- Assisted in database coding for APIs used by Login webpage 
