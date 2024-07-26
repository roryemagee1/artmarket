import { JSX, FormEvent, useState, useId } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './ProductPage.css'

import { useGetProductsDetailsQuery, useCreateReviewMutation } from '@src/slices/productsApiSlice';
import { addToCart } from '@src/slices/cartSlice';

import Rating from '@src/components/Rating'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import Meta from '@src/components/Meta'

import Background from '@src/components/Background/Background'
import Canvas from '@src/components/Canvas/Canvas'

import type { RootState } from '@src/store'
import { IReviewKeys } from '@src/types/interfaces'

export default function ProductPage(): JSX.Element {
  const { id } = useParams();
  const reviewId = useId();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ quantity, setQuantity ] = useState<number>(1);
  const [ rating, setRating ] = useState<number>(0);
  const [ comment, setComment ] = useState<string>("");
  
  const { data, refetch, isLoading, error } = useGetProductsDetailsQuery(id);

  const [ createReview, { isLoading: productReviewLoading} ] = useCreateReviewMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  function handleAddToCart() {
    dispatch(addToCart({ ...data, qty: quantity }));
    navigate('/cart');
  }

  async function handleSubmitReview(event: FormEvent) {
    event.preventDefault();
    let message = "";
    try {
      const res = await createReview({ id, rating, comment });
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }};
        message = dataObj.data.message as string;
        console.log(dataObj);
        toast.error(`${message}`);
      } else {
        const dataObj = res?.data as { data: { message: string }}
        message = dataObj.data.message as string;
        toast.success(`${message}`);
      }
      refetch();
    } catch(err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message);
    }
  }

  return (
    <>
      <Meta title={data?.name} description={data?.description} />
      <Background variant="museum" whiteBackground={true} />
      <button 
        className="back-button" 
        onClick={() => navigate("/")}
      >Back
      </button>
      <section className="product-page-container">
        { 
          isLoading ? 
            <Loader /> : 
            error ? 
              <Message evalBool={false} variant="danger">{`${error}`}</Message> :
        <>
          <section className="product-container">

            <div className="canvas-box">
              <Canvas height="" width="">
                <img className="canvas-image" src={data?.image} alt={data?.name} />
              </Canvas>
            </div>

            <div className="details-area">
              <section className="info-box">
                <div>
                  <h3>{data?.name}</h3>
                  <hr />
                  <Rating rating={data?.rating} text={`${data?.numReviews} reviews`}/>
                  <hr />
                  <p>
                    <strong>Price:</strong> ${data?.price}
                  </p>
                  <hr />
                  <p>
                    <strong>Description: </strong>{data?.description}
                  </p>
                </div>
              </section>

              <section className="add-item-box">
                <div>
                  <div className="add-item-box-entry">
                      <p>Price:</p>
                      <p>
                        <strong>${data?.price}</strong>
                      </p>
                  </div>
                  <hr />
                  <div className="add-item-box-entry">
                      <p>Status:</p>
                      <p>
                        <strong>{data?.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                      </p>
                  </div>
                  <hr />
                  { 
                  data?.countInStock > 0 && (
                    <div className="add-item-box-entry">
                      <label htmlFor={reviewId + "-quantity"}>Quantity:</label>
                      <select
                        name="select"
                        id={reviewId + "-quantity"}
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                      >
                        {[...Array(data?.countInStock).keys()].map((key) => (
                          <option key={key + 1 } value={key + 1}>{key + 1}</option>
                        ))}
                      </select>
                    </div>
                    )
                  }
                  <hr />
                  <div className="add-item-box-entry">
                    <button
                      className="add-item-button"
                      type="button"
                      disabled={data?.countInStock === 0}
                      onClick={handleAddToCart}
                    >Add to Cart
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section className="review-section">
            <section className="reviews">
              <h2>Reviews</h2>
              {data.reviews.length === 0 && <Message evalBool={false} variant="info">No Reviews</Message>}
              <div>
                {
                  data.reviews.map((review: IReviewKeys) => (
                    <div className="review" key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} text="" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))
                }
                <section className="write-review-styling">
                  <h2>Write a Customer Review</h2>
                  {productReviewLoading && <Loader />}
                  { 
                    userInfo ? (
                      <form>
                        <div>
                          <label htmlFor={reviewId + "-rating"}>Rating</label>
                          <select
                            name="rating"
                            id={reviewId + "-rating"}
                            onChange={(event) => setRating(Number(event.target.value))}
                          >
                            <option value="" disabled>Select...</option>
                            <option value="1">1 - Bad</option>
                            <option value="2">2 - Poor</option>
                            <option value="3">3 - Fair</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor={reviewId + "-comment"}>Review</label>
                          <textarea
                            name="comment"
                            id={reviewId + "-comment"}
                            value={comment}
                            placeholder="Click here to write a review."
                            onChange={(event) => setComment(event.target.value)}
                          >
                          </textarea>
                        </div>

                        <button
                          className="write-review-button"
                          disabled={productReviewLoading}
                          type="submit"
                          onClick={(event) => handleSubmitReview(event)}
                        >Submit
                        </button>
                      </form>
                    ) : (
                      <Message evalBool={false} variant="info"><>Please <Link to="/login">sign in</Link> to leave a review.</></Message>
                    ) 
                  }
                </section>
              </div>
            </section>
          </section>
        </>
        }
      </section>
    </>
  )
}