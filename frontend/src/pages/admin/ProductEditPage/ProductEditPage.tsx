import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductEditPage.css'

import { 
  useGetProductsDetailsQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from '@src/slices/productsApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import FormContainer from '@src/components/FormContainer/FormContainer'

import Background from '@src/components/Background/Background'

export default function ProductEditPage(): JSX.Element {
  const { id: paramId } = useParams();
  const id = useId();

  const [ name, setName ] = useState<string>("");
  const [ price, setPrice ] = useState<number>(0);
  const [ image, setImage ] = useState<string>("/images/sample.jpg");
  const [ brand, setBrand ] = useState<string>("");
  const [ category, setCategory ] = useState<string>("");
  const [ countInStock, setCountInStock ] = useState<number>(0);
  const [ description, setDescription ] = useState<string>("");

  const { data: product, isLoading: productLoading, error: productError } = useGetProductsDetailsQuery(paramId);

  const [ updateProduct, { isLoading: updateLoading } ] = useUpdateProductMutation();

  const [ uploadProductImage ] = useUploadProductImageMutation();

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
      id: paramId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    let message: string = "";
    try {
      const res = await updateProduct(updatedProduct);
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }}
        message = dataObj.data.message as string;
        toast.error(message);
      } else {
        toast.success(`${updatedProduct.name} updated successfully!`);
      }
      navigate("/admin/productlist");
    } catch(err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message);
    }
  }

  async function handleUploadFile(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    const target = (event.target as HTMLInputElement);
    const file: File = (target.files as FileList)[0];
    formData.append("image", file); 
    let message: string = "";
    try {
      const res = await uploadProductImage(formData).unwrap();
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }}
        message = dataObj.data.message as string;
        toast.error(message);
      } else {
        toast.success(res.message);
        setImage(res.image);
      }
    } catch(err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message);
    }
  }
  
  return (
    <section className="product-edit-list-container">
      <Background variant="museum" whiteBackground={true} />
      <button 
        className="back-button" 
        onClick={() => navigate('/admin/productlist')}
      >Go Back
      </button>
      <FormContainer>
        <section className="edit-product-styling">
          <h1>Edit Product</h1>
          {
            updateLoading && <Loader width="70vw" />
          }
          {
            productLoading ? 
            <Loader width="70vw" /> : 
            productError ?
            <Message evalBool={false} variant="danger">{`${productError}`}</Message> : (
              <form>
                <div>
                  <label htmlFor={id + "-name"}>Name</label>
                  <input
                    id={id + "-name"}
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  >
                  </input>
                </div>

                <div>
                  <label htmlFor={id + "-price"}>Price</label>
                  <input
                    id={id + "-price"}
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(event) => setPrice(parseFloat(event.target.value))}
                  >
                  </input>
                </div>
                  
                <div>
                  <label htmlFor={id + "-image"}>Image</label>
                  <input
                    id={id + "-image"}
                    name="image"
                    type="text"
                    placeholder="Image url"
                    value={`${image.replace(/\/.*?\//, "")}`}
                    disabled
                  >
                  </input>
                  <input
                    name="file"
                    type="file"
                    placeholder="Choose file"
                    onChange={(event) => handleUploadFile(event) }
                  >
                  </input>
                </div>
                

                <div>
                  <label htmlFor={id + "-brand"}>Brand</label>
                  <input
                    id={id + "-brand"}
                    name="brand"
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  >
                  </input>
                </div>


                <div>
                  <label htmlFor={id + "-count-in-stock"}>Count in Stock</label>
                  <input
                    id={id + "-count-in-stock"}
                    name="countInStock"
                    type="number"
                    placeholder="Enter count in stock"
                    value={countInStock}
                    onChange={(event) => setCountInStock(parseInt(event.target.value))}
                  >
                  </input>
                </div>

                <div>
                  <label htmlFor={id + "-category"}>Category</label>
                  <input
                    id={id + "-category"}
                    name="category"
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                  </input>
                </div>

                <div>
                  <label htmlFor={id + "-description"}>Description</label>
                  <textarea
                    id={id + "-description"}
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  >
                  </textarea>
                </div>

                <button 
                  type="submit" 
                  className="update-button"
                  onClick={(event) => handleSubmit(event)}
                >Update
                </button>

              </form>
            )
          }
        </section>
      </FormContainer>
    </section>
  )
}