import { JSX } from 'react';
import ReactLoading from 'react-loading';

interface ILoader {
  size?: string;
  display?: string;
}

export default function Loader({ size="50px", display="flex" }: ILoader): JSX.Element {
  return (
    <div style={{ display: display, justifyContent: "center", alignItems: "center", width: "88vw" }}>
      <ReactLoading type="spin" color='black' width={size} /> 
    </div>
  )
}