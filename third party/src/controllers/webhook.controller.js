import { createHash } from "../utils/createHash.js";
import { webhookResponsePayload } from "../consts.js";
import { v4 as uuidv4 } from "uuid";
import {
  logWebhook,
  fetchWebhooks,
  clearAllWebhooks
} from "../services/webhook.js";

const makeRecipe = async (req, res) => {
  try {
    //console.log("recieved recipe data:", req.body);
    //console.log("recipe is cooking");

    //build success object for persistence
    const persistentObj = {};

    //store client ip
    persistentObj.requester_ip = req.ip;

    //generate event id
    const eventId = uuidv4();
    persistentObj.event_id = eventId;

    setTimeout(async () => {
      //we add a timestamp into our payload as well as our headers to verify 2 things
      //first , if someone catches our request in between and sends it on our server , it will always work because theres no system to stop this attack
      //we add timestaml in our headers and we will invalidate any request that happens after some period of time , say 5 minutes , so in case we get a request older than 5 minutes , we can simlpy ignore
      //we use timestamo with payload because in case the payload is same , the attacker might catch it and with some future timestamp may send it , in that case agaiin our server will validate the hash
      //if we mix timestamo with payload ,  it will generate some hash that can never be mapped with a future timestamp for the same payload as i simply cant generate the hash for some random timestamp
      const timeStamp = Date.now();

      //create the hash with the payload that we will be sending to the main server
      const secret = process.env.WEBHOOK_SECRET;
      //the idea is to create a signature with the response that we will be sending to the main server , and the main server has the same secret already so this can easily be verified
      const hash = createHash(
        JSON.stringify(webhookResponsePayload) + "-" + timeStamp,
        secret
      );

      persistentObj.signature = hash;
      persistentObj.payload = webhookResponsePayload;
      persistentObj.timestamp = timeStamp;

      try {
        const response = await fetch("http://localhost:3000/webhook/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-webhook-signature": hash,
            "x-timestamp": timeStamp,
          },
          body: JSON.stringify(webhookResponsePayload),
        });

        const data = await response.json();
        //console.log("webhook response: ", data);

        persistentObj.status = "SUCCESS";

        await logWebhook(persistentObj);

        return res.status(200).json({
          status: "OK",
          data: {
            dish: "chicken curry",
            taste: "spicy with italian sauce",
            quantity: 5,
          },
        });
      } catch (error) {
        //console.log("error making http call with\n: ", error.message);

        persistentObj.payload = null;
        persistentObj.signature = null;
        persistentObj.timestamp = Date.now();
        persistentObj.status = "ERROR";

        await logWebhook(persistentObj);

        return res.status(500).send("server error");
      }
    }, 3000);
  } catch (error) {
    //console.log(error.message);
    return res.status(500).send("server error");
  }
};

const fetchAllWebhooks = async (req, res) => {
  try {
    const data = await fetchWebhooks();
    return res.status(200).json(data);
  } catch (error) {
    //console.log(error.message);
    return res.status(500).send("server error");
  }
};

const clearAll = async (req, res) => {
  try {
    const data = await clearAllWebhooks();
    return res.status(200).json(data);
  } catch (error) {
    //console.log(error.message);
    return res.status(500).send("server error");
  }
};


export { makeRecipe, fetchAllWebhooks , clearAll };
