import mongoose from "mongoose";
const { Schema } = mongoose;

const webhookSchema = new Schema(
  {
    event_id: String,
    client_ip: String,
    payload: Object,
    signature: String,
    timestamp: String,
    status: String,
  },
  { timestamps: true }
);

const Webhook = mongoose.model("Webhook", webhookSchema);
export default Webhook;
