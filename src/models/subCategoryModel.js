import { Schema, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, `SubCategory must be unique`],
      minlength: [2, `Too short SubCategory name`],
      maxlength: [32, `Too long SubCategory name`],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

const SubCategoryModel = model("SubCategory", subCategorySchema);

export default SubCategoryModel;
