import { JSX } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant: string;
  children: string | JSX.Element;
}

// The parseWorkaround should be removed in the final production version of this application.  I am only including it now because there is an issue with the data key being unknown type.

export default function Message({ variant="info", children }: IMessage): JSX.Element {
  let evalBool: boolean = false;
  let output = "";
  if (typeof children === "object") {
    evalBool = true
    output = parseWorkaround();
    // console.log(output);
  }

  function parseWorkaround() {
    return eval("children?.data?.message");
  }

  return (
    <Alert variant={variant}>
      {evalBool ? output : children}
    </Alert>
  )
}