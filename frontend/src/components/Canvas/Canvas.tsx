import { JSX } from 'react'
import './Canvas.css'

interface ICanvas {
  height: string;
  width: string;
  children: JSX.Element;
}

export default function Canvas({ children, height="", width=""}: ICanvas): JSX.Element {
  console.log(height, width);

  return (
    <div className="canvas">
      { children }
    </div>
  )
}