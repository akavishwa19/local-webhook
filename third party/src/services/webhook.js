import Webhook from "../models/webhook.model.js";

const logWebhook = async (payload)=>{
    const data=new Webhook(payload);
    await data.save();
    return data;
}

const fetchWebhooks = async () =>{
    const data = await Webhook.find().select("event_id client_ip status createdAt").sort({createdAt:-1});
    return data; 
}

const fetchWebhookDetails = async (id) =>{
    const data =await Webhook.findById(id);
    return data;
}


export {
    logWebhook,fetchWebhooks,fetchWebhookDetails
}
