import Head from 'next/head'
import Link from 'next/link'
import Footer from '../Footer/Footer';

import Header from '../Header';

import styles from './Layout.module.scss'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {children}
      </main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← На главную</a>
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
