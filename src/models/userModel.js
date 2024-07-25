import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImage: String,
    password: {
      type: String,
      required: [true, "password requird"],
      minlength: [6, "too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

userSchema.post(["init", "save"], (doc) => {
  // return image base url + image name in the response
  if (doc.profileImage) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
    doc.profileImage = imageUrl;
  }
});

const UserModel = model("User", userSchema);

export default UserModel;
