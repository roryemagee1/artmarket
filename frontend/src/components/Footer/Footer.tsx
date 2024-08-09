import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>&#169; {currentYear}  Audasite LLC. All Rights Reserved.</p>
    </footer>
  )
}