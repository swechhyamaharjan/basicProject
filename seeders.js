import products from "./data/products.js";
import users from "./data/users.js";

import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";

import connectDB from "./utils/db.js";

connectDB();
async function loadData() {
  try {
    const insertedUsers = await User.insertMany(users);
    const admin = insertedUsers[0]._id;
    const newProducts = products.map((p) => {
      return { ...p, user: admin };
    })
    await Product.insertMany(newProducts);
    console.log("Data loaded");
    process.exit();
  } catch (error) {
    console.log("Error while loading DB:", error.message);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("DB cleared success!!");
    process.exit();
  } catch (error) {
    console.log("Error while clearing DB:", error.message);
    process.exit(1);
  }
}

if (process.argv[2] === "-d"){
  destroyData();
}else{
  loadData();
}