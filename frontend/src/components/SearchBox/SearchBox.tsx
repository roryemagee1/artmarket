import { JSX, FormEvent, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './SearchBox.css'

export default function SearchBox(): JSX.Element {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [ keyword, setKeyword ] = useState<string>(urlKeyword || "")

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    setKeyword(urlKeyword || "");
  }, [urlKeyword])

  return (
    <form className="search-styling">
      { urlKeyword && <Link to="/">Reset</Link> }
      <input
        type="text"
        name="query"
        value={keyword}
        placeholder="Search products..."
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button
        type="submit"
        className="search-button"
        onClick={(event) => handleSubmit(event)}
      >Search
      </button>
    </form>
  )
}