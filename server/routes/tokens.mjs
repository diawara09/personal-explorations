import express,{Router} from 'express'
import Token from '../models/tokens.mjs'

import {google} from 'googleapis'
import serviceAccount from '../privatekeys.json' with { type: "json" };
const router = Router()

router.use(express.json())






// Define the required scopes.
var scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database"
];

// Authenticate a JWT client with the service account.
var jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);
let accessToken

// Use the JWT client to generate an access token.
jwtClient.authorize(function(error, tokens) {
  if (error) {
    console.log("Error making request to generate access token:", error);
  } else if (tokens.access_token === null) {
    console.log("Provided service account does not have permission to generate access tokens");
  } else {
     accessToken = tokens.access_token;

    // See the "Using the access token" section below for information
    // on how to use the access token to send authenticated requests to
    // the Realtime Database REST API.
  }
});

router.post("/", async(req,res) => {
    const {token} = req.body

    try {
        const newToken = new Token({token})
        await newToken.save()
        return res.send(newToken)
    } catch (error) {
        return res.send({error: error.message})
    }
})
router.get("/", async(req,res) => {
    try {
        const allTokens = await Token.find()
        const lastToken = allTokens[allTokens.length - 1]
        const data = {
            message: {
              token: lastToken.token,
              notification: {
                title: "Start your journey!",
                body: "Suffering makes you beautiful!"
              },
              webpush: {
                fcm_options: {
                  link: "https://personal-explorations.vercel.app/"
                }
              }
            }
          }
        const sendNotification = await fetch("https://fcm.googleapis.com//v1/projects/realtime-database-85a38/messages:send",{
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken} `
            },
            
            body: JSON.stringify(data)
        })
        const response = await sendNotification.json()
        return res.send(response)
    } catch (error) {
        return res.send({error: error.message})
    }
})



export default router