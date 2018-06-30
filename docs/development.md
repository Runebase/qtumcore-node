# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop runebasecore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/runebasecore-node.git
git clone git@github.com:<yourusername>/runebasecore-lib.git
```

To develop runebase or to compile from source:

```bash
git clone git@github.com:<yourusername>/runebasecoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See runebase documentation for building runebase on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download runebase distribution, you'll need to compile runebased from source, and setup your configuration to use that version.


We now will setup symlinks in `runebasecore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf runebasecore-lib
ln -s ~/runebasecore-lib
rm -rf runebased-rpc
ln -s ~/runebased-rpc
```

And if you're compiling or developing runebasecoin:
```bash
cd ../bin
ln -sf ~/runebase/src/runebased
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd runebasecore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/runebased.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/runebased.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch runebasecore-node.json
touch package.json
```

Edit `runebasecore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "runebased",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "runebased": {
      "spawn": {
        "datadir": "/home/<youruser>/.runebase",
        "exec": "/home/<youruser>/runebase/src/runebased"
      }
    }
  }
}
```

**Note**: To install services [runebase-insight-api](https://github.com/runebase/insight-api) and [runebase-explorer](https://github.com/runebase/runebase-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/runebasecore-lib
ln -s ~/runebasecore-node
ln -s ~/runebase-insight-api
ln -s ~/runebase-explorer
```

Make sure that the `<datadir>/runebase.conf` has the necessary settings, for example:
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

From within the `devnode` directory with the configuration file, start the node:
```bash
../runebasecore-node/bin/runebasecore-node start
```