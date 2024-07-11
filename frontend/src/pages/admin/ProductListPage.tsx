import { JSX } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { useGetProductsQuery, useCreateProductMutation } from '@src/slices/productsApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IProductKeys } from '@src/types/interfaces'

export default function ProductListPage(): JSX.Element {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery(null);

  const [ createProduct, { isLoading: createProductLoading }] = useCreateProductMutation();

  function handleDelete(id: string) {
    console.log("Delete: ", id);
  }

  async function handleCreateProduct() {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct(null);
        refetch();
      } catch(err) {
        toast.error("Product Error!"/* || err?.data?.message || err?.message */);
      }
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          { createProductLoading && <Loader size="20px" display=""/> }
          <Button 
            className="btn-sm m-3"
            onClick={handleCreateProduct}
          ><FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {
        isLoading ? 
          <Loader /> : 
        error ?
          <Message variant="danger">{`${error}`}</Message> : 
        (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { 
                  products.map((product: IProductKeys) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button 
                          variant="danger" 
                          className="btn-sm"
                          onClick={() => handleDelete(product._id)}
                          ><FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </>
        )
      }
    </>
  )
}