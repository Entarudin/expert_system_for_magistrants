const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const controller = require("./authController")
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(cors())
app.use("/auth",authRouter);

const start = async () =>{
    try{
        await mongoose.connect("mongodb+srv://qwerty:Maksim228228@cluster0.1nl3j.mongodb.net/auth?retryWrites=true&w=majority", { useNewUrlParser: true },  { useFindAndModify: false })
        await mongoose.set('useNewUrlParser', true);
        app.listen(PORT,() => console.log(`server started on port ${PORT}`))
    }
        catch(e){
        console.log(e);
    }
}
start();