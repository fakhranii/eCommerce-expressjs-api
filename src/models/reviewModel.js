import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    title: String,
    ratings: {
      type: String,
      min: [1, "Min ratings value is 1.0"],
      max: [1, "Max ratings value is 5.0"],
      required: [true, "review ratings required"],
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Review must be belong to user"],
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must be belong to product"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

const ReviewModel = model("Review", reviewSchema);

export default ReviewModel;
