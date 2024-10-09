import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trym: true,
    },
    price: {
        type: Number,
        required: true,
        trym: true,
        min: [0, "Price can not be less than 1"],
    },
    description: {
        type: String,
        required: true,
        trym: true,
    },
    image: {
        type: String,
        required: true,
        trym: true,
    },
    category: {
        type: String,
        required: true,
        trym: true,
    }
},
{
    timestamps: true,
}
);

productSchema.index({ name: "text", category: "text" });

export default mongoose.model("Product", productSchema);