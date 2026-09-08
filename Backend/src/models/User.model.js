const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3, maxlength: 30, index: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    password: {
      type: String,
      required: function () { return !this.googleId; }, // only required if NOT a Google user
      minlength: 6,
      select: false,
    },
    googleId: { type: String, unique: true, sparse: true }, // sparse = allows multiple nulls
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {

  if (!this.isModified("password") || !this.password) return;

  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.isPasswordCorrect = async function (plainPassword) {
  if (!this.password) return false;
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);