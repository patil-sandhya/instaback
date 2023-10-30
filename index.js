const express = require("express")
const cors = require("cors")
require("dotenv").config
const {connection} = require("./db")
const {userRouter} = require("./Routes/userRoute")
const {postRouter} = require("./Routes/postRoute")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/post", postRouter)
app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("server is running on 8080")
        console.log("db connected")
    } catch (error) {
       console.log(error) 
    }
})