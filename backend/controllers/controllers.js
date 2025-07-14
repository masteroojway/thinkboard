import Note from "../models/Notes.js"
export async function getNotes(req, res){
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "internal server error"});
    }
}
export async function createNotes(req, res){
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        const savednote = await newNote.save();
        res.status(201).json(savednote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "could not create note"});
    }
}
export async function putNotes(req, res){
    try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title, content},{new:true})
        if(!updateNote)return res.status(404).json({message: "not found"});
        res.status(200).json(updateNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "could not update"});
    }
}
export async function deleteNotes(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote)return res.status(404).json({message: "couldnot find message to delete"});
        res.status(200).json({message: "delted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "could not delete"});
    }
}
export async function getnoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note)return res.status(404).json({message: "Not found"});
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "could not be found"});
    }
}