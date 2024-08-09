import { JSX } from 'react'
import './Canvas.css'

interface ICanvas {
  height?: string;
  width?: string;
  children: JSX.Element;
}

export default function Canvas({ children }: ICanvas): JSX.Element {
  return (
    <div className="canvas">
      { children }
    </div>
  )
}