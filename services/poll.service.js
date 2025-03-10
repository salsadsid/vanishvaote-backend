import Poll from "../models/Poll.js";

async function createPollService(pollParam) {
  try {
    const poll = new Poll(pollParam);
    return await poll.save();
  } catch (error) {
    throw new Error(error ? error.message : "Poll creation failed");
  }
}

export const pollService = {
  createPollService,
};
