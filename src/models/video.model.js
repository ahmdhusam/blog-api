const { Schema, model, Types } = require("mongoose");

const videoSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Types.ObjectId, required: true, ref: "User" },
    squar_cover: { type: String, required: true },
    rectangle_cover: { type: String, required: true },
    youtube_url: { type: String, required: true },
    summary: { type: String, required: true },
    categories: [{ type: Types.ObjectId, required: true, ref: "Categories" }],
    viewCount: { type: Number, required: true },
    shareCount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports.Video = model("Video", videoSchema);
