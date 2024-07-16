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
brandSchema.post(["init", "save"], (doc) => {
  // return image base url + image name in the response
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
});

const BrandModel = model("Brand", brandSchema);

export default BrandModel;
