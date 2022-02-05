import Head from 'next/head'
import Link from 'next/link'
import Footer from '../Footer';

import styles from './Layout.module.scss';


export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <div className={styles.container}>

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
