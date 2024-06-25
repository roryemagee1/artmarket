import { JSX } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant: string;
  children: string;
  /*text: {
    message: string;
    stack: string;
  };*/
}

export default function Message({ variant="info", children, /*text*/ }: IMessage): JSX.Element {
  return (
    <Alert variant={variant}>
      {/* {"message" in text ? text?.message : children} */}
      {children}
    </Alert>
  )
}