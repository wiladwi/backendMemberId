const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const HASH_ROUND = 10;
let userSchema = mongoose.Schema(
  {
    email : {
      type: String,
      required: [false, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxLength: [225, "Maximum password length is 225 charactersr"],
      minLength: [6, "Password length is at least 6 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [false, "Username is required"],
    },
    authentication_token: {
      type: String
    },
    loginAt: {
      type : Date,
      default : Date.now()
    },
    loginType: {
      type: String,
      Enum: ["email", "google", "facebook"],
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);
// CEK EMAIL TERDAFTAR
userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value !== '' ? value : 'xxx' });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `Email already exist`
);

// CRYPT PASSWORD
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("User", userSchema);
