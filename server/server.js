const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Backend is running...")
})

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}...`)
    })
})
.catch((err) => {
    console.log(err)
})