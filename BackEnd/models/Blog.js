import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    content: { type: String, required: true },

    image: { type: String },

    metaTitle: { type: String },

    metaDescription: { type: String },

    keywords: [{ type: String }],

    permalink: {
      type: String,
      required: true,
      unique: true,
    },

    schema: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);