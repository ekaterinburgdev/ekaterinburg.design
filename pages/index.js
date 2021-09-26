import { getSortedPostsData } from '../lib/posts'

import Head from 'next/head'
import Image from 'next/image'
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


        <div>
          <b><Link href={`/partners`}>Партнеры</Link></b>
        </div>

        <div>
          <b><Link href={`/team`}>Команда</Link></b>
        </div>

        <div>
          <b><Link href={`/contacts`}>Почта и соцсети</Link></b>
        </div>


        <h2>Проекты</h2>
        <ul style={{display: 'flex'}}>
          {allPostsData.map(({ id, date, title, image }) => (
            <li key={id}>
              <Image src={image} alt="" width={200} height={200} />

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
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
