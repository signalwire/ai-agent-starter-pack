import fetch from 'node-fetch';

async function sipDomainAppExists() {
    const BASE_URL = "https://" + process.env['SIGNALWIRE_SPACE']

    let url = BASE_URL + '/api/relay/rest/domain_applications?filter_name=ai-agent-starter-pack';

    let headers = {
        Accept: "application/json",
        Authorization:
            "Basic " + Buffer.from(`${process.env.PROJECT_ID}:${process.env.REST_API_TOKEN}`).toString("base64"),
    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        const responseData = await response.json();

        if (responseData.data.length === 0) {
            console.log("Domain application does not exist");
            return false;
        } else {
            console.log(responseData);
            process.env.DOMAIN_APP_ID = responseData.data[0].id;
            process.env.DOMAIN_APP_URL = 'sip:testing@' + responseData.data[0].domain + '.dapp.signalwire.com';
            console.log("Domain application exists");
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
    }

}

async function createSipDomainApp() {
    const BASE_URL = "https://" + process.env['SIGNALWIRE_SPACE']

    let url = BASE_URL + '/api/relay/rest/domain_applications';

    let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
            "Basic " + Buffer.from(`${process.env.PROJECT_ID}:${process.env.REST_API_TOKEN}`).toString("base64"),
    };

    let payload = {
        "name": "ai-agent-starter-pack",
        "identifier": "ai-agent-starter-pack",
        "call_handler": "relay_script",
        "call_relay_script_url": "https://" + process.env.PUBLIC_URL + '/agents/Nataly',
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        console.log(responseData);

        process.env.DOMAIN_APP_ID = responseData.id;
        process.env.DOMAIN_APP_URL = 'sip:testing@' + responseData.domain + '.dapp.signalwire.com';

    } catch (error) {
        console.error("Error:", error);
    }

}


export async function setUpSipDomainApp() {
    if (await sipDomainAppExists()) {
        console.log("Domain application already exists");
        return;
    } else {
        createSipDomainApp();
    }
}

export async function updateDomainAppHandlerUrl(req, res) {

    let agentName = req.body.agentName || "Nataly";

    let url = "https://" + process.env.SIGNALWIRE_SPACE + '/api/relay/rest/domain_applications/' + process.env.DOMAIN_APP_ID;

    let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
            "Basic " + Buffer.from(`${process.env.PROJECT_ID}:${process.env.REST_API_TOKEN}`).toString("base64"),
    };

    let payload = {
        "call_relay_script_url": "https://" + process.env.PUBLIC_URL + "/agents/" + agentName
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        console.log(responseData);

    } catch (error) {
        console.error("Error:", error);
    }
}
