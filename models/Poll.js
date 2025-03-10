import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
  expiresAt: Date,
  isPublic: { type: Boolean, default: true },
  hideResults: Boolean,
  reactions: {
    like: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
  },
  created: { type: Date, default: Date.now },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
