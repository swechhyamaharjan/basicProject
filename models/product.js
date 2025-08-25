import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
  },
  image: {
    type: String,
    default: 'images/sample.jpg'
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number
  }  
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;