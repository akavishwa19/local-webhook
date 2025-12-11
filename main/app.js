const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get('/healthz', async (req, res) => {
    res.send('healthz works fine for server at port:' + port)
});

app.post('/start-cooking', async (req, res) => {
    try {
        console.log('order is placed')
        await fetch('http://localhost:3001/make-recipe', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                item: 'chicken',
                taste: 'spicy',
                quantity: 5
            })
        })
        return res.status(200).send('order is placed , pls wait till it processes')
    } catch (error) {
        console.log("error making http call with\n: ", error.message)
    }
})

app.post('/webhook/recipe', async (req, res) => {
    try {
        const recievedData=req.body;
        console.log('final response: ',recievedData);
        console.log('order served')
        return res.status(200).json({recievedData})
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log('serves on http://localhost:' + port)
})