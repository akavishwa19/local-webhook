import Webhook from "../models/webhook.model.js";

const logWebhook = async (payload)=>{
    const data=new Webhook(payload);
    await data.save();
    return data;
}

const fetchWebhooks = async () =>{
    const data = await Webhook.find().sort({createdAt:-1});
    return data; 
}

const clearAllWebhooks = async () =>{
    const data = await Webhook.deleteMany();
    return data; 
}



export {
    logWebhook,fetchWebhooks,clearAllWebhooks
}
