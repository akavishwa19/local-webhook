import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDb from "./db/index.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/healthz", async (req, res) => {
  res.send("healthz works fine for server at port:" + port);
});

//routes
import webhookRouter from "./routes/webhook.route.js";
app.use("/",webhookRouter)

app.listen(port, async () => {
  await connectDb();
  console.log("serves on http://localhost:" + port);
});
