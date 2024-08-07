import { JSX } from 'react'
import { Link } from 'react-router-dom'
// import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'

// import Carousel from 'react-bootstrap/Carousel'
// import Image from 'react-bootstrap/Image'

import Message from '@src/components/Message/Message'

import { useGetTopProductsQuery } from '@src/slices/productsApiSlice'

import { IProductKeys } from '@src/types/interfaces'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function ProductCarousel(): JSX.Element {
  const { data: products, error } = useGetTopProductsQuery(null);
  
  return (
    // <>
    //   {
    //     error ? <Message variant="danger" evalBool={false}>{`${error}`}</Message> :
    //     (
    //       <Carousel pause="hover" className="bg-primary mb-4">
    //         {
    //           products?.map((product: IProductKeys) => (
    //             <Carousel.Item key={product._id}>
    //               <Link to={`/product/${product._id}`}>
    //                 <Image src={product.image} alt={product.name} fluid />
    //                 <Carousel.Caption className="carousel-captions">
    //                   <h2>
    //                     {product.name} (${product.price})
    //                   </h2>
    //                 </Carousel.Caption>
    //               </Link>
    //             </Carousel.Item>
    //           ))
    //         }
    //       </Carousel>
    //     )
    //   }
    // </>
    <>
      {/* {
        error ? 
        <Message variant="danger" evalBool={false}>{`${error}`}</Message> :
        ( 
          <Carousel responsive={responsive}>
            {
              products?.map((product: IProductKeys) => (
                <div key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                    <div className="carousel-captions">
                      <h2>
                        {product.name} (${product.price})
                      </h2>
                    </div>
                  </Link>
                </div>
              ))
            }
          </Carousel>
        )
      } */}
      <h1>Test</h1>
    </>
  )
}