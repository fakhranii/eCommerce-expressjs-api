import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CartModel = model("Cart", cartSchema);
export default CartModel;
