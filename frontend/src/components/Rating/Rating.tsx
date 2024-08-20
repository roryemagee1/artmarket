import { JSX } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import './Rating.css'

interface IRating {
  rating: number;
  text: string;
}

export default function Rating({ rating, text }: IRating): JSX.Element {
  return (
    <div className="rating">
      <span>
        { rating >= 1 ? <FaStar className="star" /> : rating >= 0.5 ? <FaStarHalfAlt className="star" /> : <FaRegStar className="empty-star" /> }
      </span>
      <span>
        { rating >= 2 ? <FaStar className="star" /> : rating >= 1.5 ? <FaStarHalfAlt className="star" /> : <FaRegStar className="empty-star" /> }
      </span>
      <span>
        { rating >= 3 ? <FaStar className="star" /> : rating >= 2.5 ? <FaStarHalfAlt className="star" /> : <FaRegStar className="empty-star" /> }
      </span>
      <span>
        { rating >= 4 ? <FaStar className="star" /> : rating >= 3.5 ? <FaStarHalfAlt className="star" /> : <FaRegStar className="empty-star" /> }
      </span>
      <span>
        { rating >= 5 ? <FaStar className="star" /> : rating >= 4.5 ? <FaStarHalfAlt className="star" /> : <FaRegStar className="empty-star" /> }
      </span>
      <span className="rating-text">
        { text && text }
      </span>
    </div>
  )
}