import Head from 'next/head'
import Link from 'next/link'
import Footer from '../Footer';
import Menu from '../Menu';

import styles from './Layout.module.scss';


export default function Layout({ children, home }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

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
      </div>

      <Footer />
    </>
  )
}
