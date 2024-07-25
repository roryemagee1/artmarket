import { JSX, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './HomePage.css'

// import Row from 'react-bootstrap/Row'

import { useGetProductsQuery } from '../../slices/productsApiSlice';

import ProductCarousel from '@src/components/ProductCarousel'
import Meta from '@src/components/Meta'

import Background from '@src/components/Background/Background'
import Feed from '@src/components/Feed/Feed'

export default function HomePage(): JSX.Element {
  const { keyword, pageNumber } = useParams(); 
  const { data } = useGetProductsQuery({ keyword, pageNumber });
  const [ feed, setFeed ] = useState<Array<JSX.Element | null>>([<Feed key={0} pageNumber={pageNumber || "1"}/>]);
  const [ pageCount, setPageCount ] = useState<number>(1);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) {
        // console.log(window.innerHeight + document.documentElement.scrollTop, " vs. ", document.documentElement.offsetHeight);
      } else {
        pageCount < data?.pages ? 
          setFeed(prevState => (
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
      <section className="masonry-container">
      {
        feed.map((element) => { return element })
      }
      </section>
    </>
  )
}