import { useState, useEffect } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../slices/productApiSlice";
import { Link, useNavigate, useParams } from "react-router";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ProductEditPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { }] = useUpdateProductMutation();

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        _id: product._id,
        name,
        price: Number(price),
        brand,
        category,
        countInStock: Number(countInStock),
        image,
      }).unwrap();
      toast.success(res.message);
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.error || err?.error);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setImage(product.image)
    }
  }, [product]);


  return (
    <>
      <Link className="btn btn-light" to="/admin/products">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Product</h2>
        <Form onSubmit={updateProductHandler}>
          <Form.Group className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" value={image}/>
            <Form.Control type="file" label="Choose Image" />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </Form.Group>
          <Button type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ProductEditPage;