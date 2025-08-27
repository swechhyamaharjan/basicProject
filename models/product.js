import mongoose from "mongoose";
import { z } from 'zod';

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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

export const productAddSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number(),
  category: z.string().min(2),
  brand: z.string(),
  rating: z.number().default(0),
  numReviews: z.number().default(0),
  image: z.string().default("/images/sample.jpg"),
})

export const productUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().min(2).optional(),
  brand: z.string().optional(),
  rating: z.number().optional(),
  numReviews: z.number().optional(),
  image: z.string().optional(),
});

const Product = mongoose.model("Product", productSchema);

export default Product;