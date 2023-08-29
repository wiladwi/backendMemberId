const mongoose = require("mongoose");

let awardFilesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    image: {
      type:String,  
    },
    type: { 
      type: String,
      Enum: ["Voucher", "Product", "Giftcard"],
      default: "Voucher",
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Awards", awardFilesSchema);
