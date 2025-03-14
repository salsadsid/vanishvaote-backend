import Poll from "../models/Poll.js";

async function createPollService(pollParam) {
  try {
    const poll = new Poll(pollParam);
    await poll.save();

    return { id: poll._id };
  } catch (error) {
    throw new Error(error ? error.message : "Poll creation failed");
  }
}

async function getPollByIdService(id) {
  try {
    const poll = await Poll.findById(id);
    if (!poll || poll.expiresAt < new Date()) {
      return "Poll expired or not found";
    }
    return poll;
  } catch (error) {
    throw new Error(error ? error.message : "Poll not found");
  }
}

async function voteService(pollId, optionId) {
  try {
    const result = await Poll.updateOne(
      { _id: pollId },
      { $inc: { [`options.${optionId}.votes`]: 1 } }
    );
    return result;
  } catch (error) {
    throw new Error(error ? error.message : "Vote failed");
  }
}

async function reactionService(type, pollId) {
  try {
    const result = await Poll.updateOne(
      { _id: pollId },
      { $inc: { [`reactions.${type}`]: 1 } }
    );
    return result;
  } catch (error) {
    throw new Error(error ? error.message : "Reaction failed");
  }
}

async function commentService(pollId, comment) {
  try {
    const comment = new Comment({
      pollId: req.params.id,
      text: req.body.text,
    });
    await comment.save();
    return { id: comment._id };
  } catch (error) {
    throw new Error(error ? error.message : "Comment failed");
  }
}

export const pollService = {
  createPollService,
  getPollByIdService,
  voteService,
  reactionService,
};
