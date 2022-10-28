const { Schema, Types, model } = require("mongoose");

const videoSeriesSchema = new Schema(
  {
    name: { type: String, required: true },
    videos: [{ type: Types.ObjectId, required: true, ref: "Video" }],
  },
  { timestamps: true }
);

module.exports.VideoSeries = model("Video_series", videoSeriesSchema);
