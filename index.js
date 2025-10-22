const express = require('express');
const body_parser = require('body-parser');
const ConnectDB = require('./Config/db');
const dotenv = require('dotenv').config()
const cors = require('cors');
const auth_router = require('./Router/AuthRouter');
const product_router = require('./Router/ProductRouter');
const cart_router = require('./Router/CartRouter');
const msg_router = require('./Router/MessageRouter');


const app = express();
app.use(cors())
app.use(express.json());
PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Cheers.... im working up")
})

app.use("/auth",auth_router)
app.use('/product',product_router)
app.use("/cart",cart_router)
app.use("/api",msg_router)

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
    ConnectDB()
})