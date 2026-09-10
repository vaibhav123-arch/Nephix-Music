const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
      index: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: Date,
    },

    genre: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

albumSchema.index({ title: "text" });

module.exports =
  mongoose.models.Album ||
  mongoose.model("Album", albumSchema);