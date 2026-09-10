const mongoose = require("mongoose");

const recentlyPlayedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: false,
    },

    youtubeVideoId: {
      type: String,
      default: "",
    },

    youtubeTitle: {
      type: String,
      default: "",
    },

    youtubeChannel: {
      type: String,
      default: "",
    },

    youtubeThumbnail: {
      type: String,
      default: "",
    },

    playedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RecentlyPlayed =
  mongoose.models.RecentlyPlayed ||
  mongoose.model("RecentlyPlayed", recentlyPlayedSchema);

module.exports = RecentlyPlayed;