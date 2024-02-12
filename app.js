import { setUpNgrok } from "./helpers/ngrok.js";
import { setUpSipDomainApp, updateDomainAppHandlerUrl } from "./helpers/domainApp.js";
import { logMessage, setUpWebsocketServer } from "./helpers/logger.js";
import { setUpSipEndpoint } from "./helpers/sipEndpoint.js";
import express from "express";
import open from "open";
import agents from "./src/agents.js";
import functions from "./src/functions.js";
import dotenv from 'dotenv';
dotenv.config();

await setUpNgrok();

let app = express();
app.set("view engine", "ejs");
app.use(express.json());

// Load AI Agent routes
app.use("/agents", agents);

// Load AI Function routes
app.use("/functions", functions);

app.get("/", (req, res) => {
    console.log(process.env.DOMAIN_APP_ID);

    res.render("pages/index.ejs", {
        domainAppId: process.env.DOMAIN_APP_ID,
        domainAppUrl: process.env.DOMAIN_APP_URL,
        publicUrl: process.env.PUBLIC_URL,
        sipEndpointDomain: process.env.SIP_DOMAIN,
        sipEndpointUser: process.env.SIP_ENDPOINT_USER,
        sipEndpointPass: process.env.SIP_ENDPOINT_PASS,
        agents: agents.stack.map((r) => r.route.path.replace("/", ""))
    });
});

app.post("/updateDomainApp", updateDomainAppHandlerUrl)

app.post("/debug", (req, res) => {
    console.log("DEBUG WEBHOOK:", req.body);

    logMessage(req.body);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`App listening at port ${process.env.PORT}`);
});

setUpWebsocketServer(server);
setUpSipEndpoint();
setUpSipDomainApp();

await open("https://" + process.env.PUBLIC_URL);