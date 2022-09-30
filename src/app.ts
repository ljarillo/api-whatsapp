import express, { Request, Response } from 'express'
import Sender from './sender';

const sender = new Sender()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected
    })
})

app.get('/teste', async (req: Request, res: Response) => {
    let teste = await sender.teste()
    return res.status(200).json({ status: "success", message: "teste" })
})

app.get("/send", async (req: Request, res: Response) => {
    const { number, message } = req.body
    try {
        await sender.sendText(number, message + Math.random())
        return res.status(200).json({ status: "success", message: "enviado" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", message: err })
    }
})

app.listen(5000, () => {
    console.log("Server Start")
})