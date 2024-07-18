import { JSX } from 'react'
import './Background.css'

interface IBackground {
  variant: string;
}
export default function Background({ variant="museum"}: IBackground): JSX.Element {
  return (
    <div className={variant}></div>
  )
}