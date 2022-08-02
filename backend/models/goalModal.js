const mongoose = require("mongoose");
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // must reference the type of collection
    },

    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true, // will add created at  and  updated at
  }
);

module.exports = mongoose.model("Goal", goalSchema);
