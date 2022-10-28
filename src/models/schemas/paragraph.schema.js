const { Schema } = require("mongoose");

const paragraphSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = paragraphSchema;
