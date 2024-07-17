import { JSX } from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'react-bootstrap/Pagination'

interface IPage {
  pages: number;
  page: number;
  isAdmin: boolean;
  keyword: string;
}

export default function Paginate({ pages, page, isAdmin=false, keyword="" }: IPage): JSX.Element {
  
  return (
    <>
      {
        pages > 1 && (
          <Pagination>
            { 
              [...Array(pages).keys()].map((pageNum) => (
                <Pagination.Item 
                  key={pageNum + 1}
                  active={pageNum + 1 === page}
                  as={Link} 
                  to={
                    !isAdmin ? 
                    keyword ? 
                    `/search/${keyword}/page/${pageNum + 1}` : 
                    `/page/${pageNum + 1}` : 
                    `/admin/productList/${pageNum + 1}`
                    } 
                  >{pageNum + 1}
                </Pagination.Item>
              )) 
            }
          </Pagination>
        )
      }
    </>
  )
}