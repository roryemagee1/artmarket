import { JSX } from 'react'
import { Helmet } from 'react-helmet-async'

interface IMeta {
  title?: string,
  description?: string,
  keywords?: string,
}

export default function Meta({ title="Welcome to ArtMarket", description="The go-to store for buying indie art!", keywords="art, store, art store, indie, independent, aesthetic" }: IMeta): JSX.Element {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}