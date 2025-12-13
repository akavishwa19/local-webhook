import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/healthz", async (req, res) => {
  res.send("healthz works fine for server at port:" + port);
});

//routes
import webhookRouter from "./routes/webhhok.route.js";
app.use("/",webhookRouter)

app.listen(port, () => {
  console.log("serves on http://localhost:" + port);
});


