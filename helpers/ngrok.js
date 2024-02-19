import ngrok from 'ngrok';
import dotenv from 'dotenv';
dotenv.config();

export async function setUpNgrok() {

    let ngrokUrl = process.env['NGROK_URL']

    if (!ngrokUrl) {
        ngrokUrl = await ngrok.connect({
            authtoken: process.env?.['NGROK_TOKEN'],
            port: process.env.PORT
        });
    }

    ngrokUrl = ngrokUrl.replace('https://', '');

    console.log("NGROK URL:", ngrokUrl);
    process.env['PUBLIC_URL'] = ngrokUrl
}
