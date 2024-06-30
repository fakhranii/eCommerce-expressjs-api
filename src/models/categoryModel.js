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

const CategoryModel = model("Category", categorySchema);

export default CategoryModel;
