const express = require("express");
const cors = require("cors");
require("dotenv").config({ quiet: true });
const { whitelistedIps, webhookPayload } = require("./consts.js");
const { verifySignature } = require("./utils/verifySignature.js");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/healthz", async (req, res) => {
  res.send("healthz works fine for server at port:" + port);
});

app.post("/start-cooking", async (req, res) => {
  try {
    console.log("order is placed");
    await fetch("http://localhost:3001/make-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });
    return res.status(200).send("order is placed");
  } catch (error) {
    console.log("error making http call with\n: ", error.message);
     return res.status(500).send('"error making http call')
  }
});

app.post("/webhook/recipe", async (req, res) => {
  try {
    if (!whitelistedIps.includes(req.ip)) {
      return res
        .status(403)
        .json({ status: "NOT ALLOWED", message: "resource not allowed" });
    }

    const webhookSignature = req.headers["x-webhook-signature"];
    const webhookSecret = process.env.WEBHOOK_SECRET;

    const signatureValidity = verifySignature(
      JSON.stringify(req.body),
      webhookSecret,
      webhookSignature
    );
    if (!signatureValidity) {
      return res
        .status(403)
        .json({ status: "NOT ALLOWED", message: "resource not allowed" });
    }

    const recievedData = req.body;
    console.log("final response: ", recievedData);
    console.log("order served");
    return res.status(200).json({ recievedData });
  } catch (error) {
    console.log(error);
     return res.status(500).send('server error')
  }
});

app.listen(port, () => {
  console.log("serves on http://localhost:" + port);
});
