
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});

const pageSchema = new mongoose.Schema(
  {
    metaTitle: String,
    metaDescription: String,
    permalink: {
      type: String,
      unique: true,
    },

    featuredImage: String,

    title: String,
    description: String,

    sections: [sectionSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("portfolio", pageSchema);