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
        <p className={'site-description site-description_align-left'}>
          &laquo;Дизайн-код Екатеринбурга&raquo;&nbsp;&mdash; инициативный проект независимых дизайнеров города. Мы&nbsp;разрабатыва&shy;ем единые визуальные стандарты городской среды и&nbsp;внедряем их&nbsp;в&nbsp;жизнь.
        </p>
        <p className={'site-description site-description_align-right'}>
          Наша цель&nbsp;&mdash; сделать Екатеринбург уютным и&nbsp;комфортным, чтобы жите&shy;лям хотелось остаться, а&nbsp;гостям захотелось вернуться.
        </p>

        <h2 className={'section-heading'}><Link href={`/partners`}>Партнеры</Link></h2>
        <h2 className={'section-heading'}><Link href={`/team`}>Команда</Link></h2>
        <h2 className={'section-heading'}><Link href={`/contacts`}>Почта и соцсети</Link></h2>


        <section>
          <h2 className={'section-heading'}>Проекты</h2>
          <PostPreviewGrid posts={projects} />
        </section>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  return { props: { projects: await getNotionDatabaseItems('Projects') } }
}
