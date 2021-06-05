const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featureSchema = new Schema({
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  upVoted: [
    {
      type: String,
      ref: "upvote",
    },
  ],
  downVoted: [
    {
      type: String,
      ref: "upvote",
    },
  ],
});

feature = mongoose.model("feature", featureSchema, "feature");

module.exports = {
  feature
};
