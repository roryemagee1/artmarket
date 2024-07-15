import { JSX } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Pagination from 'react-bootstrap/Pagination'

interface IPage {
  pages: number;
  page: number;
  isAdmin: boolean;
}

export default function Paginate({ pages, page, isAdmin=false }: IPage): JSX.Element {
  
  return (
    <>
      {
        pages > 1 && (
          <Pagination>
            { 
              [...Array(pages).keys()].map((pageKey) => (
                <LinkContainer
                  key={pageKey + 1}
                  to={ !isAdmin ? `/page/${pageKey + 1}` : `/admin/productList/${pageKey + 1}`}
                >
                  <Pagination.Item active={pageKey + 1 === page}>{pageKey + 1}</Pagination.Item>
                </LinkContainer>
              )) 
            }
          </Pagination>
        )
      }
    </>
  )
}