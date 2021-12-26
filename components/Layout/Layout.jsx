import Head from 'next/head'
import Link from 'next/link'
import Footer from '../Footer/Footer';

import Header from '../Header';

import styles from './Layout.module.scss';


export default function Layout({ children, home, menuItems }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Header menuItems={menuItems} />

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
