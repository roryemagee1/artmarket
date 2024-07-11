import { JSX } from 'react';
import { Spinner } from 'react-bootstrap'

interface ILoader {
  size?: string;
}

export default function Loader({ size="100px" }: ILoader): JSX.Element {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: size,
        height: size,
        margin: "auto",
        /* display: "block", */
      }}
    >
    </Spinner>
  )
}