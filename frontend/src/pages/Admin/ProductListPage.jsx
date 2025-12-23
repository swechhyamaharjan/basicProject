import { Table, Row, Col, Button, ToastBody } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useGetProductsQuery } from "../../slices/productApiSlice"
import { useAddProductMutation, useDeleteProductMutation } from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();
  const [deleteProduct, { }] = useDeleteProductMutation();

  const addProductHandler = async () => {
    if(window.confirm("Are you sure you want to add the product?")){
      try {
      await addProduct().unwrap();
      toast.success("Product Created");
    } catch (error) {
      toast.error(error?.data?.error || error?.error)
    }
    }
  }

  const deleteProductHandler = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try {
      const res = await deleteProduct(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.error || error?.error)
    }
    }
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col>
          <Button variant="dark" size="sm"
            onClick={addProductHandler}><FaEdit /> Add Products</Button>
        </Col>
      </Row>
      <Row>
        {
          isLoading ? <Loader />
            : error ? <Message>{error?.data?.error}</Message>
              : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PRODUCT NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>BRAND</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map(product => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                            <Button variant="light" size="sm">
                              <FaEdit />
                            </Button>
                            <Button variant="light" size="sm" className="ms-2"
                              onClick={() => deleteProductHandler(product._id)}>
                              <FaTrash style={{ color: "red" }} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              )
        }
      </Row>
    </>
  )
}

export default ProductListPage