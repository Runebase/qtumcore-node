Runebasecore Node
============

A RUNEBASE full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install runebase-bitcore https://github.com/runebase/runebase-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install runebasecore-node  

    ```bash
    npm i https://github.com/runebase/runebasecore-node.git#master

    $(npm bin)/runebasecore-node create mynode

    cd mynode

    ```  
5. Edit runebasecore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "runebased",
        "web"
      ],
      "servicesConfig": {
        "runebased": {
          "spawn": {
            "datadir": "/home/user/.runebase",
            "exec": "/home/user/runebase-bitcore/src/runebased"
          }
        }
      }
	}
    ```  
6. Edit runebase.conf  

    ```
    server=1
    whitelist=127.0.0.1
    txindex=1
    addressindex=1
    timestampindex=1
    spentindex=1
    zmqpubrawtx=tcp://127.0.0.1:28332
    zmqpubhashblock=tcp://127.0.0.1:28332
    rpcallowip=127.0.0.1
    rpcuser=user
    rpcpassword=password
    rpcport=18332
    reindex=1
    gen=0
    addrindex=1
    logevents=1
    ```  
7. Run Node  

    ```
    $(npm bin)/runebasecore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of Runebasecore:

- [RUNEBASE Insight API](https://github.com/runebase/insight-api)
- [RUNEBASE Explorer](https://github.com/runebase/runebase-explorer)

## Contributing



## License
