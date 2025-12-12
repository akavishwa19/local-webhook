const express = require('express');
const cors = require('cors');
require('dotenv').config({quiet:true});
const {createHash} = require('./utils/createHash.js')
const {webhookResponsePayload} = require('./consts.js')


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get('/healthz', async (req, res) => {
    res.send('healthz works fine for server at port:' + port)
})

app.post('/make-recipe', async (req, res) => {
    try {
        console.log('recieved recipe data:', req.body)
        console.log('recipe is cooking');
        setTimeout(async () => {
            console.log('cooked creating recipe');

            //create the hash with the payload that we will be sending to the main server
            const secret=process.env.WEBHOOK_SECRET;
            const hash=createHash(JSON.stringify(webhookResponsePayload),secret);
            

            try {
                const response = await fetch('http://localhost:3000/webhook/recipe', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-webhook-signature":hash,
                    },
                    body: JSON.stringify(webhookResponsePayload)
                })

                const data =await response.json();
                console.log('webhook response: ',data)

                return res.status(200).json({
                    status: "OK",
                    data: {
                        dish: 'chicken curry',
                        taste: 'spicy with italian sauce',
                        quantity: 5
                    }
                })
            } catch (error) {
                console.log("error making http call with\n: ", error.message);
                return res.status(500).send('server error')
            }
        }, 3000)
    } catch (error) {
        console.log(error.message);
         return res.status(500).send('server error')
    }
})

app.listen(port, () => {
    console.log('serves on http://localhost:' + port)
})