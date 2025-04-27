import express from 'express'
import {} from 'dotenv/config'
import mongoose from 'mongoose'
import tokenRouter from './routes/tokens.mjs'
import cors from 'cors'
main().catch(err => console.log(err));

const corsOptions = {
    origin: [
      "https://personal-explorations.vercel.app",
      'http://localhost:5173',
    ],
    
    credentials: true,
    optionsSuccessStatus: 200,
  }

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Database connected!');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = process.env.PORT || 3000
const app = express()
app.use(cors(corsOptions))

app.use("/token", tokenRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
