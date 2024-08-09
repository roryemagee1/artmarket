import { JSX } from 'react';
import ReactLoading from 'react-loading';

interface ILoader {
  size?: string;
  display?: string;
  width?: string;
}

export default function Loader({ size="50px", display="flex", width="85vw" }: ILoader): JSX.Element {
  return (
    <div style={{ display: display, justifyContent: "center", alignItems: "center", width: width }}>
      <ReactLoading type="spin" color='black' width={size} /> 
    </div>
  )
}