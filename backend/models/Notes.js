import { request } from "express"
import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Note = new mongoose.model("Note", noteSchema)
export default Note;