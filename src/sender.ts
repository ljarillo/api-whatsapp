import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'
import { create, Whatsapp, Message, SocketState } from "venom-bot"

export type QRCode = {
    base64Qr: string,
    asciiQr: string,
    attempts: number,
    urlCode?: string
}

class Sender {
    private client: Whatsapp
    private connected: boolean;
    private qr: QRCode;

    constructor() {
        this.initialize()
    }

    get isConnected(): boolean {
        return this.connected
    }

    get qrCode(): QRCode {
        return this.qr
    }

    async sendText(to: string, body: string) {

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error('this number is not valid')
        }

        let phoneNumber = parsePhoneNumber(to, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("@c.us")
            ? phoneNumber
            : `${phoneNumber}@c.us`

        await this.client.sendText(phoneNumber, body)

        console.log("phoneNumber", phoneNumber)
    }

    async teste() {
        console.log(await this.client.getConnectionState());
    }

    private initialize() {

        const qr = (
            base64Qr: string,
            asciiQr: string,
            attempts: number
        ) => {
            this.qr = { base64Qr, asciiQr, attempts }
        }
        const status = (statusSession: string) => {
            // isLogged || notLogged || browserClose || qrReadSuccess || 
            // qrReadFail || autocloseCalled || desconnectedMobile || deleteToken 
            // chatsAvailable || deviceNotConnected || serverWssNotConnected || 
            // noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || 
            // initWhatsapp || erroPageWhatsapp || successPageWhatsapp || 
            // waitForLogin || waitChat || successChat

            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"]
                .includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client

            this.client.onStateChange((state) => {
                console.log(state)
                this.connected = state === SocketState.CONNECTED
            });
        }

        create('ws-sender-dev', qr, status, {
            headless: false,
            useChrome: false,
            chromiumVersion: '818858'
        })
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

}

export default Sender