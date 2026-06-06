import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Chatter | Home</title>
      </Helmet>
      <main>
        <h1>Welcome to Chatter</h1>
      </main>
    </>
  )
}