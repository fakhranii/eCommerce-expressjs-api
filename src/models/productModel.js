import { kStringMaxLength } from "buffer";
import { Schema, model } from "mongoose";
import { type } from "os";

const productSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required!"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },

    images: [String],
    category: {
      type: Schema.ObjectId,
      ref: "Category", // we write here the string name of the model
      required: [true, "Product must be belongs to category"],
    },
    subcategories: [
      {
        type: Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    //? the next two options are to enable virtual populate
    toJSON: { virtuals: true },
    toObjeect: { virtuals: true },
  }
);

//! Mongoose query middleware -> return the product with its parent category

/**
 * @desc we will return virtual field called reviews contain all reviews form model "Review" based on foreignField: "product" equal field "_id" inside the ProductModel itself
 */
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

// return image base url + image name in the response
productSchema.post(["init", "save"], (doc) => {
  if (doc.imageCover) {
    const imageCoverUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageCoverUrl;
  }

  if (doc.images) {
    const productImages = [];
    doc.images.map((image) => {
      const imagesUrl = `${process.env.BASE_URL}/products/${image}`;
      productImages.push(imagesUrl);
      doc.images = productImages;
    });
  }
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
