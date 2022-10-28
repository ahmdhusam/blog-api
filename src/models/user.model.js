const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Visitor", "Author"],
    },
    thumbnail: String,
    facebook: String,
    twitter: String,
    articles: [{ type: Types.ObjectId, required: true, ref: "Article" }],
    videos: [{ type: Types.ObjectId, required: true, ref: "Video" }],
    papers: [{ type: Types.ObjectId, required: true, ref: "Papers" }],
  },
  { timestamps: true }
);

module.exports.User = model("User", userSchema);
