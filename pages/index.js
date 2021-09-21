import { getSortedPostsData } from '../lib/posts'

import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import Date from '../components/Date'

// TODO Setup typograph
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Ekaterinburg.design</title>
      </Head>

      <section>
        <p>
          «Дизайн-код Екатеринбурга» — инициативный проект независимых дизайнеров города. Мы разрабатываем единые визуальные стандарты городской среды и внедряем их в жизнь.
          <br />
          Наша цель — сделать Екатеринбург уютным и комфортным, чтобы жителям хотелось остаться, а гостям захотелось вернуться.
        </p>

        <h2>Проекты</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li  key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>

              <br />

              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        <div>
          <Link href={`/partners`}>Партнеры</Link>
        </div>

        <div>
          <Link href={`/team`}>Команда</Link>
        </div>

        <div>
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
