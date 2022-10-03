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
                        message: "error"
                    })
                });
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