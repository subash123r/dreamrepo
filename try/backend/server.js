const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const routepro = require("./routes/productroutes.js")


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/products",routepro)

app.get("/",(req,res)=>{
    res("api products is running ")
})

const PORT =3000

app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})