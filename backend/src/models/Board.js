const mongoose = require("mongoose");

const boardScehma = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    privacy: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
    url: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Board", boardScehma);
