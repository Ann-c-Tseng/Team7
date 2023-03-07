const express = require('express')
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/routes')
const cors = require('cors')
const matchmaking = require("./chess/matchmaking");

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/', routes)

io.on('connection', matchmaking.newConnection)

httpServer.listen(4000, () => console.log("server is up and running"))

