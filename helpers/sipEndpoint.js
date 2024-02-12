import fetch from 'node-fetch';

export async function setUpSipEndpoint() {
    await getSipDomainProfile();

    if (await sipEndpointExists()) {
        return;
    } else {
        createSipEndpoint();
    }
}

async function getSipDomainProfile() { 
    const BASE_URL = "https://" + process.env['SIGNALWIRE_SPACE']

    let url = BASE_URL + '/api/relay/rest/sip_profile';

    let headers = {
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from(`${process.env.PROJECT_ID}:${process.env.REST_API_TOKEN}`).toString("base64"),

    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        const responseData = await response.json();

        console.log(responseData);

        process.env.SIP_DOMAIN = responseData.domain;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function sipEndpointExists() {
    const BASE_URL = "https://" + process.env['SIGNALWIRE_SPACE']

    let url = BASE_URL + '/api/relay/rest/endpoints/sip?filter_username=ai-agent-tester';

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

        console.log(responseData);

        if (responseData.data.length === 0) {
            console.log("SIP Endpoint does not exist");
            return false;
        } else {
            console.log(responseData);
            process.env.SIP_ENDPOINT_ID = responseData.data[0].id;
            process.env.SIP_ENDPOINT_USER = responseData.data[0].username;
            process.env.SIP_ENDPOINT_PASS = "ai-agent-tester";
            console.log("SIP Endpoint exists");
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function createSipEndpoint() { 
    const BASE_URL = "https://" + process.env['SIGNALWIRE_SPACE']

    let url = BASE_URL + '/api/relay/rest/endpoints/sip';

    let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
            "Basic " + Buffer.from(`${process.env.PROJECT_ID}:${process.env.REST_API_TOKEN}`).toString("base64"),
    };

    process.env.SIP_ENDPOINT_USER = "ai-agent-tester"
    process.env.SIP_ENDPOINT_PASS = "ai-agent-tester"

    let payload = {
        "username": process.env.SIP_ENDPOINT_USER,
        "password": process.env.SIP_ENDPOINT_PASS
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        console.log(responseData);

        process.env.SIP_ENDPOINT_ID = responseData.id;

    } catch (error) {
        console.error("Error:", error);
    }
}
