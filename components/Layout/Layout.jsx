import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script';
import Footer from '../Footer';
import Menu from '../Menu';

import styles from './Layout.module.scss';


export default function Layout({ children, home }) {
  return (
    <>
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
