# 𖠗 Beanz CMS 
Beanz will be a complete and diverce backend with front end templating.
Beanz is a personal project but feel free to use it.
Note that Beanz is in development, it is not yet complete!

**FEATURES**
1. Session management
2. Protected routes
3. OTP & QR email or mobile verification
4. Static file serving
5. Websocket integration
6. Front end templating for easy front end switching



### Domains
* localhost/
* static.localhost/  
* api.localhost/  
* ws.localhost #WS


# 𖠗 Install Beanz


### Clone

```BASH
git clone https://github.com/LordRampantHump/beanz
```

### Modify

```BASH
cd beanz
nano .env
```

### .env

```TXT
APP='beanz'
VERSION='1.0.0'
STATE='dev'
DOMAIN='domain.dev'
SESSION_SECRET="YOUR SESSION SECRET"
PORT='80'

THEME='default' # django, dash

JSONBIN="$2a$10$6zZ8OO7FEICxo5FSsravFu3HP8jo6JO5gwQpKrdJXKM59Or7p8Xba"
MONGODB="mongodb://YOUR_USER:YOUR_PASSWORD@localhost:27017/?authSource=admin"

MAILGUN_DOMAIN='mgs.YOUR_SERVER.com'
MAILGUN_API='YOUR API TOKEN'
```

### Modify Hosts

```BASH
sudo nano /etc/hosts
```

### /etc/hosts

```TXT
127.0.0.1   domain.dev
127.0.0.1   static.domain.dev
127.0.0.1   api.domain.dev
127.0.0.1   ws.domain.dev                  #ws
```

### Install Database

Before installing the MongoDB package, download the GnuPG and cURL utility by running this command in your command-line interface:
```BASH
sudo apt-get install -y gnupg curl
```

Use cURL and GnuPG to Import the MongoDB public GPG key to retrieve the installation package:
```BASH
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
```

Run the following to configure the list file on Ubuntu 20.04:
```BASH
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

Refresh the APT repository to synchronize the local package database:
```BASH
sudo apt-get update
```

Run the following command to install the latest stable version of MongoDB using the APT package management system:
```BASH
sudo apt-get install -y mongodb-org
```

Optionally, choose a specific version of the official mongodb-org package. For example, run the following command to install MongoDB version 7.0.2:
```BASH
sudo apt-get install -y mongodb-org=7.0.2 mongodb-org-database=7.0.2 mongodb-org-server=7.0.2 mongodb-mongosh=7.0.2 mongodb-org-mongos=7.0.2 mongodb-org-tools=7.0.2
```

Start MongoDB Service:
```BASH
sudo systemctl start mongod
```

Automatically load it at startup:
```BASH
sudo systemctl enable mongod
```

Use mongosh terminal:
```BASH
mongosh
```

Create DB:
```BASH
use beanz
```
Create Users:
```BASH
db.createCollection('users')
```

Create a DB manager:
```BASH
db.createUser({  user: "beanz", pwd: "beanz!password", roles: [ { role: "readWrite", db: "beanz" }  ] })
```


# 𖠗 Install Redis Server


Redis:
```BASH
sudo apt install redis-server
```

Configure Redis:
```BASH
sudo nano /etc/redis/redis.conf
```

/etc/redis/redis.conf
Find "supervised" and modify as below:
```TXT
supervised systemd
```

Restart Redis:
```BASH
sudo systemctl restart redis.service
```


# 𖠗 Run Beanz



Run Beanz:
```BASH
npm start
```


```CMD
╭────────────────────────────────────────╮
│                                        │
│                                        │
│       Initializing BEANZ v 1.0.0       │
│                                        │
│                                        │
╰────────────────────────────────────────╯
Beanz Logger: Checking Beanz version...
Beanz Logger: Connected to MongoDB
Beanz Logger: Roles collection already exists
Beanz Logger: Beanz is up to date!
Beanz Logger: Connected to Redis server!
Beanz Logger: Checking websocket...
Beanz Logger: WebSocket Connection OK
Beanz Logger: Server is running on port 80 Domain: domain.dev
```


# 𖠗 Eat Beanz
They are Yummy!
