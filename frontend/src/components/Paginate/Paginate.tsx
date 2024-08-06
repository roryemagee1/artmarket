import { JSX } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Paginate.css'

interface IPage {
  pages: number;
  page: number;
  isAdmin: boolean;
  keyword: string;
}

export default function Paginate({ pages, page, isAdmin=false, keyword="" }: IPage): JSX.Element {
  console.log([...Array(pages).keys()], page);

  const smallPageList: JSX.Element = (
    <nav className="page-nav">
      { 
        [...Array(pages).keys()].map((pageNum) => (
          <div key={pageNum + 1} className="page-tile">
            <NavLink 
              className={({ isActive }) =>
                isActive ? "active" : "no-decoration"
              }
              to={
                !isAdmin ? 
                keyword ? 
                `/search/${keyword}/page/${pageNum + 1}` : 
                `/page/${pageNum + 1}` : 
                `/admin/productList/${pageNum + 1}`
                } 
              >{pageNum + 1}
            </NavLink>
          </div>
        )) 
      }
    </nav>
  )

  const previousPageLink = (
    <div className="page-tile">
      <Link 
        className="no-decoration"
        to={
          !isAdmin ? 
          keyword ? 
          `/search/${keyword}/page/${page - 1}` : 
          `/page/${page - 1}` : 
          `/admin/productlist/${page - 1}`
          } 
        >Previous
      </Link>
    </div>
    )

  const pageList = [...Array(pages).keys()].map((pageNum) => {
    if (pageNum > page - 4 && pageNum < page + 4) {
      return (
        <div key={pageNum + 1} className="page-tile">
          <NavLink 
            className={({ isActive }) =>
              isActive ? "active" : "no-decoration"
            }
            to={
              !isAdmin ? 
              keyword ? 
              `/search/${keyword}/page/${pageNum + 1}` : 
              `/page/${pageNum + 1}` : 
              `/admin/productlist/${pageNum + 1}`
              } 
            >{pageNum + 1}
          </NavLink>
        </div>
      )
    }
  })

  const nextPageLink: JSX.Element = (
    <div className="page-tile">
      <Link 
        className="no-decoration"
        to={
          !isAdmin ? 
          keyword ? 
          `/search/${keyword}/page/${page + 1}` : 
          `/page/${page + 1}` : 
          `/admin/productlist/${page + 1}`
          } 
        >Next
      </Link>
    </div>
  )


  return (
    <>
      { pages > 1 && pages < 3 && {smallPageList} }
      {
        pages > 3 && (
          <nav className="page-nav">
            { page > 1 && previousPageLink }
            { pageList }
            { page < pages && nextPageLink }
          </nav>
        )
      }
    </>
  )
}