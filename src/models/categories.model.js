const { Schema, Types, model } = require("mongoose");

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    videos: [{ type: Types.ObjectId, required: true, ref: "Video" }],
    articles: [{ type: Types.ObjectId, required: true, ref: "Article" }],
    papers: [{ type: Types.ObjectId, required: true, ref: "Papers" }],
  },
  { timestamps: true }
);

module.exports.Categories = model("Categories", categoriesSchema);
