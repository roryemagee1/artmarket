import { JSX, FormEvent, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SearchBox(): JSX.Element {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [ keyword, setKeyword ] = useState<string>(urlKeyword || "")

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (keyword.trim()) {
      // setKeyword("");
      navigate(`/search/${keyword}`)
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    setKeyword(urlKeyword || "");
  }, [urlKeyword])

  return (
    <Form className="d-flex">
      { urlKeyword && <Link to="/" className="p-2 mx-2">Reset</Link> }
      <Form.Control
        type="text"
        name="query"
        value={keyword}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
        onChange={(event) => setKeyword(event.target.value)}
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 mx-2"
        onClick={(event) => handleSubmit(event)}
      >Search
      </Button>
    </Form>
  )
}