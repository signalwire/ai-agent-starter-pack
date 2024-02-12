# ai-agent-starter-pack

## Assumptions
This project assumes you already have:
- A working Node.js environment;
- A SignalWire account;
- An Ngrok account.

## Installation

### Clone the Repository 
#### Using HTTPS
```bash
git clone https://github.com/signalwire/ai-agent-starter-pack.git
```
#### Using SSH
```bash
git clone git@github.com:signalwire/ai-agent-starter-pack.git
```

### Change to the ai-agent-starter-pack directory and install the dependencies
```bash
cd ai-agent-starter-pack
npm run install
```

## Usage

### Update .env
Make a copy of the `.env.example` file, name it `.env`, and update the credentials.

### Run the app
```bash
npm run start
```
A browser window will open up, and from there you can call Nataly or Brian. 
Modify `src/agents.js` and `src/functions.js`, restart the app, and keep iterating!
