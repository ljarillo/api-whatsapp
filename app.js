const venom = require('venom-bot');
const express = require('express');
const http = require('http');
const app = express();
const port = 5000;
const server = http.createServer(app);
const { body, validationResult } = require('express-validator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

venom
    .create({
        session: 'session-name', //name of session
        multidevice: true, // for version not multidevice use false.(default: true)
        headless: false
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {

    //5511975654552-1542017101

    app.post('/send-group', [
        body('number').notEmpty(),
        body('message').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        const message = req.body.message;
        try {
            await client
                .sendText(number + '@g.us', '😜 iLembrei: ' + message)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.text
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/send', [
        body('number').notEmpty(),
        body('message').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        const message = req.body.message;
        try {
            await client
                .sendText(number + '@c.us', '😜 iLembrei: ' + message)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.text
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/send-buttons', [
        body('number').notEmpty(),
        body('title').notEmpty(),
        body('message').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        const title = req.body.title;
        const message = req.body.message;
        const buttons = [
            {
                "buttonText": {
                    "displayText": "Sim"
                }
            },
            {
                "buttonText": {
                    "displayText": "Não"
                }
            }
        ]
        try {
            await client
                .sendButtons(number + '@c.us', title, buttons, '😜 iLembrei: ' + message)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.text
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/send-mp3', [
        body('number').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        try {
            await client.sendVoice(number + '@c.us', './mp3/ola.mp3')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.text
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/send-img', [
        body('number').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        try {
            await client
                .sendImage(
                    number + '@c.us',
                    '/img/arnald.png',
                    'Aranald',
                    'Aranald'
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.text
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/img-to-sticker', [
        body('number').notEmpty(),
    ], async (req, res) => {
        const number = req.body.number;
        try {
            await client
                .sendImageAsStickerGif(
                    number + '@c.us',
                    './img/cat.gif'
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return res.status(200).json({
                        status: "success",
                        message: "enviado"
                    })
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return res.status(500).json({
                        status: "error",
                        message: erro.message
                    })
                });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/get-all-chats', [], async (req, res) => {
        try {
            const chats = await client.getAllChats();
            console.log(chats);
            return res.status(200).json({
                status: "success",
                message: "enviado",
                chats: chats
            })
        } catch (e) {
            return res.status(500).json({
                status: "error",
                message: "error"
            })
        }
    })

    app.post('/send-list', [], async (req, res) => {
        const list = [
            {
                title: "Pasta",
                rows: [
                    {
                        title: "Ravioli Lasagna",
                        description: "Made with layers of frozen cheese",
                    }
                ]
            },
            {
                title: "Dessert",
                rows: [
                    {
                        title: "Baked Ricotta Cake",
                        description: "Sweets pecan baklava rolls",
                    },
                    {
                        title: "Lemon Meringue Pie",
                        description: "Pastry filled with lemonand meringue.",
                    }
                ]
            }
        ];

        await client.sendListMenu('5511975875993@c.us', 'Title', 'subTitle', 'Description', 'menu', list)
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
    })
}


server.listen(port, function () {
    console.log('App running on port: ' + port)
})