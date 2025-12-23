import Product from "../models/product.js";

const getProducts = async (req, res) => {
 try {
  const products = await Product.find().populate('user', "fullname email -_id");
  res.send(products);
 } catch (error) {
  res.status(500).send({error: error.message});
 }
}

const getProductsById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(!product) return res.status(404).send({error: "Product not found"});
  res.send(product);
}

const getTopProducts = async (req, res) => {
  const topProducts = await Product.find().sort({rating: -1}).limit(5);
  res.send(topProducts);
}

const addProduct = async (req, res) => {
  // const productBody = req.body;
  // const product = await Product.create({...productBody, user: req.user._id});

  const product = {
    name: "Sample Product",
    price: 0,
    category: "Sample category",
    brand: "Sample Brand",
    image: "/images/sample.jpg",
    countInStock: 0,
    user: req.user._id
  }
  const addedProduct = await Product.create(product)
  res.send({message: "Product Added Successfully!!", addedProduct});
}

const updateProduct = async (req, res) => {
  const productBody = req.body;
  const productId = req.params.id;
  const updatedProduct = await Product.findByIdAndUpdate(
    productId, 
    productBody, 
   {new: true});
  if(!updatedProduct) return res.status(404).send({error: "Product not found"});
  res.send({message: "Product updated successfully", updatedProduct});
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if(!deletedProduct) return res.status(404).send({error: "Product not found"});
  res.send({message: "Product deleted successfully", deletedProduct});
}

export {getProducts, getProductsById, getTopProducts, addProduct, updateProduct, deleteProduct}