import { JSX } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant: string;
  children: string;
}

export default function Message({ variant="info", children }: IMessage): JSX.Element {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}