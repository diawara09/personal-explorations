import express,{Router} from 'express'
import Token from '../models/tokens.mjs'

const router = Router()

router.use(express.json())








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
                Authorization: `Bearer ${process.env.ACCESS_TOKEN} `
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