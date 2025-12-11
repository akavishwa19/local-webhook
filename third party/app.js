const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

app.get('/healthz', async (req, res) => {
    res.send('healthz works fine for server at port:' + port)
})

app.post('/make-recipe', async (req, res) => {
    try {
        console.log('recieved recipe data:', req.body)
        console.log('recipe is cooking');
        setTimeout(async () => {
            console.log('cooked creating recipe');
            try {
                await fetch('http://localhost:3000/webhook/recipe', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        webhook: true,
                        acknowledgement: 'OK',
                        data: {
                            dish: 'chicken curry',
                            taste: 'spicy with italian sauce',
                            quantity: 5
                        }
                    })
                })
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
        console.log(error.message)
    }
})

app.listen(port, () => {
    console.log('serves on http://localhost:' + port)
})