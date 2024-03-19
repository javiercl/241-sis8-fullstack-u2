const moongose = require("mongoose");
const userSchema = moongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = moongose.model("User", userSchema);