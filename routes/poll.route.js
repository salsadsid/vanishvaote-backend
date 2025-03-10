import express from "express";
import pollController from "../controllers/poll.controller.js";
const router = express.Router();

router.get("/", pollController.createPoll);

export default router;
