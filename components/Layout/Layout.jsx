import Head from 'next/head'
import Link from 'next/link'

import styles from './Layout.module.scss'

const name = 'Дизайн-код Екатеринбурга'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>

        <>
          <h2>
            <Link href="/">
              <a>{name}</a>
            </Link>
          </h2>
        </>
      </header>

      <main>{children}</main>

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
