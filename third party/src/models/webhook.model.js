import mongoose from "mongoose";
const { Schema } = mongoose;

const webhookSchema = new Schema(
  {
    event_id: String,
    requester_ip: String,
    payload: Object,
    signature: String,
    timestamp: Number,
    status: {
      type:String,
      enum:["ERROR","SUCCESS"]
    },
  },
  { timestamps: true }
);

const Webhook = mongoose.model("Webhook", webhookSchema);
export default Webhook;
