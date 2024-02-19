import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import { logMessage } from "../helpers/logger.js";

export default router
    .post("/", getFunctionDeclarations)
    .post("/get_weather", getWeather)
    .post("/get_something_else", getSomethingElse);

async function getFunctionDeclarations(req, res) {
    let requestedFunctions = req.body.functions;

    await logMessage({
        type: "function_declaration_request",
        data: requestedFunctions
    });

    let functionDeclarations = [];

    requestedFunctions.forEach(async (functionName) => {
        switch(functionName) {
            case "get_weather":
                functionDeclarations.push({
                    function: "get_weather",
                    purpose: "use to get the weather",
                    argument: {
                        type: "object",
                        properties: {
                            location: {
                                description: "the location to get the current weather in",
                                type: "string",
                            }
                        },
                    },
                    web_hook_url: "https://" + process.env?.['PUBLIC_URL'] + "/functions/get_weather"
                });

                await logMessage({
                    type: "function_declaration_added",
                    data: "get_weather"
                });
                break;
                
            case "get_something_else":
                functionDeclarations.push({
                    function: "get_something_else",
                    purpose: "use to get something else",
                    argument: {
                        type: "object",
                        properties: {
                            something: {
                                description: "the something to get",
                                type: "string",
                            }
                        },
                    },
                    web_hook_url: "https://" + process.env?.['PUBLIC_URL'] + "/functions/get_something_else"
                });

                await logMessage({
                    type: "function_declaration_added",
                    data: "get_something_else"
                });
                break;
            
        }
    });

    res.send({
        functions: functionDeclarations
    })
}

// get_weather function implementation
async function getWeather(req, res) {
    await logMessage({
        type: "function_call",
        data: req.body.argument.parsed
    })
    
    let result = {
        response: "It's super super sunny!"
    }

    await logMessage({
        type: "function_call_response",
        data: result
    });

    res.send(result);
}

// get_something_else implementation
function getSomethingElse(req, res) {
    res.send({
        response: "It's something else!"
    });
}
