import { JSX } from 'react'

interface IFormContainer {
  children: JSX.Element
}

export default function FormContainer({ children }: IFormContainer): JSX.Element {
  return (
    <section className="form-container">
      <div className="form-container-row justify-content-md-center">
        <div className="form-container-column" xs={12} md={6}>
          {children}
        </div>
      </div>
    </section>
  )
}