import { Schema, model } from "mongoose";

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true } // create to fields in db -> createdAT & updatedAT
);

categorySchema.post(["init", "save"], (doc) => {
  // return image base url + image name in the response
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
});
const CategoryModel = model("Category", categorySchema);

export default CategoryModel;
