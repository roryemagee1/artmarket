import { JSX } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant: string;
  children: string | JSX.Element;
  evalBool: boolean;
}

export default function Message({ variant="info", children, evalBool=false }: IMessage): JSX.Element {
  let output: string = "";
  if (evalBool) {
    output = typeChildren()!;
  }

  function typeChildren() {
    if (children instanceof Object && "data" in children) {
      const output = children?.data as { message: string }
      return output.message;
    } else if (children instanceof Object && "error" in children) {
      const output = children?.error as string
      return output;
    }

  }

  return (
    <Alert variant={variant}>
      {evalBool ? output : children}
    </Alert>
  )
}