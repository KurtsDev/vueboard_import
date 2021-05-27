import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import {config} from "./config.js";
import {createBoardMessage, getBoardMessage} from './controllers/boardController.js'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        log: false,
        agent: false,
        origins: '*:*',
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/board/index', getBoardMessage);
app.post('/api/board/create', createBoardMessage);

io.on('connection', (socket) => {
    socket.on('new board message', (message) => {
        socket.emit('update board message', 'rrr')
    })
});

;(async () => {
    try {
        await mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();

httpServer.listen(config.port, () => console.log('Server start'));