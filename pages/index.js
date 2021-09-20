import { getSortedPostsData } from '../lib/posts'

import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import Date from '../components/Date'

import utilStyles from '../styles/utils.module.scss'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Ekaterinburg.design</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Проекты</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        <div className={utilStyles.headingLg}>
          <Link href={`/partners`}>Партнеры</Link>
        </div>

        <div className={utilStyles.headingLg}>
          <Link href={`/team`}>Команда</Link>
        </div>

        <div className={utilStyles.headingLg}>
          <Link href={`/contacts`}>Почта и соцсети</Link>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
