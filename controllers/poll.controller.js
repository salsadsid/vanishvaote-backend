import { pollService } from "../services/poll.service";

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
