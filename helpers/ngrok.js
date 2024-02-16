import ngrok from 'ngrok';
import dotenv from 'dotenv';
dotenv.config();

export async function setUpNgrok() {

    let ngrokUrl = process.env['NGROK_URL']

    if (!ngrokUrl) {
        let ngrokUrl = await ngrok.connect({
            authtoken: process.env?.['NGROK_TOKEN'],
            port: process.env.PORT
        });
    }

    ngrokUrl = ngrokUrl.replace('https://', '');

    console.log("NGROK URL:", ngrokUrl);
    console.log("publicUrl Before:", process.env?.['PUBLIC_URL']);
    process.env['PUBLIC_URL'] = ngrokUrl
    console.log("publicUrl After:", process.env?.['PUBLIC_URL']);

}
