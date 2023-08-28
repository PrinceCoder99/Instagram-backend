const express = require('express')
const connectDatabase = require('./config/database')
const User = require("./models/userModel");
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')

dotenv.config({path: 'config/config.env'})

connectDatabase()

app.use(express.json());
app.use(cors())

// Routes
app.post('/', async (req, res)=>{
    const { user, password } = req.body

    if(!user || !password){
        return res.status(400).json({success: false, msg: "Enter Username or Password"})
    }

    const users = await User.create({ user, password})

    res.status(200).json({
        success: true,
        users
    })

})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Instagram app listening on port http://localhost:${process.env.PORT}`)
})