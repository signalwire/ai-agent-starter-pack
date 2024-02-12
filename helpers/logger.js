import dotenv from 'dotenv';
dotenv.config();
import WebSocket, { WebSocketServer } from 'ws';

export function logMessage(message) {
    const ws = new WebSocket('wss://' + process.env?.['PUBLIC_URL']);

    ws.on('open', function open() {
        ws.send(JSON.stringify(message));
    });
}

export function setUpWebsocketServer(server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("WebSocket connected");

        ws.on("message", (message) => {
            console.log("Received message:", message);

            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on("close", () => {
            console.log("WebSocket disconnected");
        });
    });
}

