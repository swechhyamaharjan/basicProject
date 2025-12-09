import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      name: String,
      price: Number,
      qty: String,
      image: String,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  totalPrice: Number,
  shippingCharge: Number,
  itemPrice: Number,
  shippingAddress: {
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
 paidAt: {type: Date},
 deliveredAt: {type: Date},
 paymentMethod: {type: String}
},{
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);

export default Order;