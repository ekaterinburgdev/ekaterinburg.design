import { getNotionDatabaseItems } from '../core/notion'

import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import PostPreviewGrid from '../components/PostPreviewGrid'

// TODO Setup typograph
export default function Home({ projects }) {
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

        <h2><Link href={`/partners`}>Партнеры</Link></h2>
        <h2><Link href={`/team`}>Команда</Link></h2>
        <h2><Link href={`/contacts`}>Почта и соцсети</Link></h2>


        <section>
          <h2>Проекты</h2>
          <PostPreviewGrid posts={projects} />
        </section>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  return { props: { projects: await getNotionDatabaseItems('Projects') } }
}
