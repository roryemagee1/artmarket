import { JSX } from 'react'
import { Alert } from 'react-bootstrap'


// The commented out parts of this code are for an issue I am having with unknown types and my fetch requests.  This problem can be found in the Message component, the HomePage component, and the ProducePage component.
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