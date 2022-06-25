import Head from 'next/head'
import Login from './login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>BKM web app</title>
        <meta name="description" content="WebApp from BKM tecnology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Login />
      </main>

      <footer>
        
      </footer>
    </div>
  )
}