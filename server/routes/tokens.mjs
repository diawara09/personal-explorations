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

export default router