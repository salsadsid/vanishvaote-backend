import { pollService } from "../services/poll.service.js";

async function createPoll(req, res, next) {
  try {
    const { question, options, expiresIn, hideResults, isPublic } = req.body;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + parseInt(expiresIn));

    const poll = {
      question,
      options: options.map((opt) => ({ text: opt })),
      expiresAt: expiration,
      hideResults,
      isPublic,
    };

    const result = await pollService.createPollService(poll);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getPollById(req, res, next) {
  try {
    const pollId = req.params.id;
    console.log(pollId);
    const poll = await pollService.getPollByIdService(pollId);

    if (poll === "Poll expired or not found") {
      return res.status(404).json({ message: poll });
    }

    res.status(200).json(poll);
  } catch (error) {
    next(error);
  }
}

async function vote(req, res, next) {
  try {
    const { optionIndex: optionId } = req.body;
    const pollId = req.params.id;
    const result = await pollService.voteService(pollId, optionId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function reaction(req, res, next) {
  try {
    const { type } = req.body;
    const pollId = req.params.id;
    const result = await pollService.reactionService(type, pollId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export default { createPoll, getPollById, vote, reaction };
