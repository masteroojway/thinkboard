import express from "express"
import { createNotes, deleteNotes, getnoteById, getNotes, putNotes } from "../controllers/controllers.js"

const router = express.Router()

router.get("/", getNotes);
router.get("/:id", getnoteById)
router.post("/", createNotes);
router.put("/:id", putNotes);
router.delete("/:id", deleteNotes);

export default router;