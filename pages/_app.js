import '../lib/css/global.css';
import Head from 'next/head';
import Layout from '../components/layout/Layout'
export default function MyApp({Component,pageProps}) {
return (
  <Layout>
    <Head>
    <meta name='viewport' content="width=device-width initial-scale=1"/>
    </Head>
    <div className='flex-auto'>
  <Component {...pageProps}/>
    </div>
  </Layout>
  )
}
