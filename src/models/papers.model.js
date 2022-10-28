const { Schema, model, Types } = require("mongoose");
const paragraphSchema = require("./schemas/paragraph.schema");

const papersSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Types.ObjectId, required: true, ref: "User" },
    square_cover: { type: String, required: true },
    rectangle_cover: { type: String, required: true },
    categories: [{ type: Types.ObjectId, required: true, ref: "Categories" }],
    paragraphs: [paragraphSchema],
    readsCount: { type: Number, required: true },
    shareCount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports.Papers = model("Papers", papersSchema);
