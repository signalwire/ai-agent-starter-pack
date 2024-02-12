import express from "express";
const router = express.Router();
import { SignalWireML } from "signalwireml";
import dotenv from 'dotenv';
dotenv.config

export default router
    .post("/Nataly", nataly)
    .post("/Brian", brian)

function nataly(req, res) {
    const swml = new SignalWireML();
    const mainSection = swml.addSection("main");

    mainSection.addInstruction("answer");
    mainSection.addInstruction({
        ai: {
            prompt: {
                text: `
                    You're Nataly, a customer service agent.
                    Greet the caller.
                    Say goodbye.
`,
            },
            post_prompt_url: "https://example.com/post_prompt",
            languages: [
                {
                    name: "English",
                    code: "en-US",
                    voice: "en-US-Journey-F"
                }
            ],
            SWAIG: {
                includes: [
                    {
                        "functions": [
                            "get_weather"
                        ],
                        "url": "https://" + process.env?.['PUBLIC_URL'] + "/functions"
                    }
                ]
            }
        },
    });

    res.send(swml.toYAML());
}

function brian(req, res) {
    const swml = new SignalWireML();
    const mainSection = swml.addSection("main");

    mainSection.addInstruction("answer");
    mainSection.addInstruction({
        ai: {
            prompt: {
                text: `
                    You're Brian, a customer service agent.
                    Greet the caller.
                    If asked, you can use the get_weather function to get the current weather.
`,
            },
            SWAIG: {
                includes: [
                    {
                        "functions": [
                            "get_weather"
                        ],
                        "url": "https://" + process.env?.['PUBLIC_URL'] + "/functions"
                    }
                ]
            }
        },
    });

    res.send(swml.toYAML());
}