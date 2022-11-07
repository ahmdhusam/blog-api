const { Schema, Types, model } = require("mongoose");
const paragraphSchema = require("./schemas/paragraph.schema");

const articleSchema = new Schema(
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

module.exports.Article = model("Article", articleSchema);
