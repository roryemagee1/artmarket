import { JSX, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './HomePage.css'

import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

import { useGetProductsQuery } from '../../slices/productsApiSlice';

// import Product from '@src/components/Product'
// import Loader from '@src/components/Loader'
// import Message from '@src/components/Message'
// import Paginate from '@src/components/Paginate'
import ProductCarousel from '@src/components/ProductCarousel'
import Meta from '@src/components/Meta'

import Background from '@src/components/Background/Background'
import Feed from '@src/components/Feed/Feed'

// import { IProductKeys } from '@src/types/interfaces'

// interface IFeed {
//   pageNumber: string;
// }
// function Feed({ pageNumber }: IFeed): JSX.Element {
//   const { keyword } = useParams(); 
//   console.log(pageNumber);
//   const { data: feedData, isLoading, error} = useGetProductsQuery({ keyword, pageNumber });
//   console.log(feedData);

//   return (
//     <>
//       { 
//         isLoading ? 
//           <Loader /> : 
//           error ? 
//           <Message evalBool={true} variant="danger">{`${error}`}</Message> : null 
//       }
//       {
//         feedData?.products && (
//           feedData.products.map((product: IProductKeys): JSX.Element => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>  
//             )  
//           )
//         )
//       }
//     </>
//   )
// }

export default function HomePage(): JSX.Element {
  const { keyword, pageNumber } = useParams(); 
  const { data, /*isLoading, error*/ } = useGetProductsQuery({ keyword, pageNumber });
  const [ feedArr, setFeedArr ] = useState<Array<JSX.Element | null>>([<Feed key={0} pageNumber={pageNumber || "1"}/>]);
  const [ pageCount, setPageCount ] = useState<number>(1);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) {
        // console.log(window.innerHeight + document.documentElement.scrollTop, " vs. ", document.documentElement.offsetHeight);
      } else {
        pageCount < data?.pages ? 
          setFeedArr(prevState => (
            [...prevState, <Feed key={prevState.length + 1} pageNumber={String(prevState.length + 1)} />]) 
          ) :
          null;
        setPageCount(prevState => prevState + 1);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },);

  return (
    <>
      <Meta title="Welcome to Artmarket!" />
      <Background variant="museum" whiteBackground={false} />
      { !keyword && <ProductCarousel /> }
      {/* { 
        isLoading ? 
          <Loader /> : 
          error ? 
          <Message evalBool={true} variant="danger">{`${error}`}</Message> : null 
      } */}
      <Row>
        {/* {
          data?.products && (
            data.products.map((product: IProductKeys): JSX.Element => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>  
              )  
            )
          )
        } */}
      {/* </Row> */}
      {/* { 
        data?.pages && <Paginate
          pages={data?.pages}
          page={data?.page}
          isAdmin={false}
          keyword={keyword ? keyword : ""} 
          /> 
      } */}
      {/* <Row> */}
      {
        feedArr.map((element) => { return element })
      }
      </Row>
      {/* <button onClick={() => setFeedArr(prevState => [...prevState, <Feed key={prevState.length} />])}>Increase Feed</button> */}
    </>
  )
}