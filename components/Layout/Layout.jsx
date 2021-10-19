import Head from 'next/head'
import Link from 'next/link'

import Header from '../Header';

import styles from './Layout.module.scss'

const name = 'Дизайн-код Екатеринбурга'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <h1>
        <Link href="/">
          <a>{name}</a>
        </Link>
      </h1>

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

      <footer>
        2017–2021
      </footer>
    </div>
  )
}
