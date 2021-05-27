import pkg from 'mongoose';
const {Schema, model} = pkg;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    headline: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true
});

export const boardMessage = model('boardMessage', schema);