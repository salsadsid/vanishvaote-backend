import express from "express";
import pollController from "../controllers/poll.controller.js";
const router = express.Router();

router.post("/", pollController.createPoll);

router.get("/:id", pollController.getPollById);

router.post("/:id/vote", pollController.vote);

export default router;
