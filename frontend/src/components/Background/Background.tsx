import { JSX } from 'react'
import './Background.css'

interface IBackground {
  variant: string;
  whiteBackground: boolean;
}
export default function Background({ variant="museum", whiteBackground=false}: IBackground): JSX.Element {
  
  return (
    <>
      <div className={variant}></div>
      { whiteBackground && <div className="white-background"></div>}
    </>
  )
}