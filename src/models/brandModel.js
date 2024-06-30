import { Schema, model } from "mongoose";

const brandSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true } // create to fields in db -> createdAT & updatedAT
);

const BrandModel = model("Brand", brandSchema);

export default BrandModel;
