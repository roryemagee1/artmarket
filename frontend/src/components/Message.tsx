import { JSX } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant: string;
  children: string | JSX.Element /*| FetchBaseQueryError | SerializedError*/;
}

// The parseWorkaround should be removed in the final production version of this application.  I am only including it now because there is an issue with the data key being unknown type.
// Here is a link for fixing the FetchBaseQueryError issue: https://stackoverflow.com/questions/70017789/react-redux-how-to-handle-errors-in-rtk-queries-mutation-typescript
// More: https://www.reddit.com/r/reactjs/comments/14uc8x1/getting_this_error_after_getting_response_from/
// More: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling

export default function Message({ variant="info", children }: IMessage): JSX.Element {
  let evalBool: boolean = false;
  let output = "";
  if (typeof children === "object") {
    evalBool = true
    output = parseWorkaround();
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