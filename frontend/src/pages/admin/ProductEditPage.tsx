import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { 
  useGetProductsDetailsQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from '@src/slices/productsApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import FormContainer from '@src/components/FormContainer'

export default function ProductEditPage(): JSX.Element {
  const { id } = useParams();

  const [ name, setName ] = useState<string>("");
  const [ price, setPrice ] = useState<number>(0);
  const [ image, setImage ] = useState<string>("/images/sample.jpg");
  const [ brand, setBrand ] = useState<string>("");
  const [ category, setCategory ] = useState<string>("");
  const [ countInStock, setCountInStock ] = useState<number>(0);
  const [ description, setDescription ] = useState<string>("");

  const { data: product, isLoading: productLoading, error: productError } = useGetProductsDetailsQuery(id);

  const [ updateProduct, { isLoading: updateLoading } ] = useUpdateProductMutation();

  const [ uploadProductImage, /*{ isLoading: uploadImageLoading }*/ ] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const updatedProduct = {
      id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    try {
      await updateProduct(updatedProduct).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/productlist");
    } catch(err) {
      toast.error("Product update failed."/* || err?.data?.message || err?.error*/);
    }
  }

  async function handleUploadFile(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    const target = (event.target as HTMLInputElement);
    const file: File = (target.files as FileList)[0];
    formData.append("image", file); 
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch(err) {
      toast.error("Image upload failed."/* || err?.data?.message || err?.error*/);
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <>
          <h1>Edit Product</h1>
          {
            updateLoading && <Loader />
          }
          {
            productLoading ? 
              <Loader /> : 
              productError ?
              <Message variant="danger">{`${productError}`}</Message> : (
                <Form>
                  <Form.Group controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="price" className="my-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(event) => setPrice(parseFloat(event.target.value))}
                    >
                    </Form.Control>
                  </Form.Group>

                  {/* Image Input */}
                  
                  <Form.Group controlId="image" className="my-2">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      name="image"
                      type="text"
                      placeholder="Enter image url"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                    >
                    </Form.Control>
                    <Form.Control
                      name="file"
                      type="file"
                      placeholder="Choose file"
                      onChange={(event) => handleUploadFile(event) }
                    >
                    </Form.Control>
                  </Form.Group>
                 

                  <Form.Group controlId="brand" className="my-2">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      name="brand"
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>


                  <Form.Group controlId="countInStock" className="my-2">
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control
                      name="countInStock"
                      type="number"
                      placeholder="Enter count in stock"
                      value={countInStock}
                      onChange={(event) => setCountInStock(parseInt(event.target.value))}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="category" className="my-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      name="category"
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="description" className="my-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{height: "120px"}}
                      name="description"
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="my-2"
                    onClick={(event) => handleSubmit(event)}
                  >Update
                  </Button>

                </Form>
              )
          }
        </>
      </FormContainer>
    </>
  )
}