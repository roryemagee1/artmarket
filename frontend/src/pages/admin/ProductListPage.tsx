import { JSX } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { 
  useGetProductsQuery, 
  useCreateProductMutation,
  useDeleteProductMutation,
} from '@src/slices/productsApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import Paginate from '@src/components/Paginate'

import { IProductKeys } from '@src/types/interfaces'

export default function ProductListPage(): JSX.Element {
  const { pageNumber } = useParams();
  
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const [ createProduct, { isLoading: createProductLoading }] = useCreateProductMutation();

  const [ deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();

  const navigate = useNavigate();

  async function handleDelete(product: IProductKeys) {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      let message: string = ""
      try {
        const res = await deleteProduct(product);
        if (res?.error) {
          const dataObj = res?.error as { data: { message: string, stack: string }}
          message = dataObj.data.message as string;
          toast.error(message);
        } else {
          toast.success(`${product.name} deleted!`);
        }
        refetch();
      } catch (err) {
        if (err instanceof Error && "data" in err) {
          const output = err?.data as { message: string }
          message = output.message;
        }
        toast.error(message);
      }
    }
  }

  async function handleCreateProduct() {
    if (window.confirm("Are you sure you want to create a new product?")) {
      let message = "";
      try {
        const res = await createProduct(null);
        if (res?.error) {
          const dataObj = res?.error as { data: { message: string, stack: string }}
          message = dataObj.data.message as string;
          toast.error(message);
        } else {
          toast.success(`New product created!`);
        }
        refetch();
      } catch (err) {
        if (err instanceof Error && "data" in err) {
          const output = err?.data as { message: string }
          message = output.message;
        }
        toast.error(message);
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
        isLoading || deleteProductLoading ? 
          <Loader /> : 
        error ?
          <Message evalBool={false} variant="danger">{`${error}`}</Message> : 
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
                  data.products.map((product: IProductKeys) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Button onClick={() => navigate(`/admin/product/${product._id}/edit`)} variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="danger" 
                          className="btn-sm"
                          onClick={() => handleDelete(product)}
                          ><FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} keyword=""/>
          </>
        )
      }
    </>
  )
}