import {boardMessage} from '../models/BoardMessage.js'

export const getBoardMessage = (req, res) => {
    boardMessage.find({}, (err, message) => {
       res.send(message)
    })
}

export const createBoardMessage = (req, res) => {
    const message = new boardMessage(req.body.boardMessage);
    message.save();
}