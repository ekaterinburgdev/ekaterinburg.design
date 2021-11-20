import { getNotionDatabaseItems } from '../core/notion'

import Head from 'next/head'
import Image from 'next/image'

import menuItems from '../routes.json';

import Layout from '../components/Layout'
import PostPreviewGrid from '../components/PostPreviewGrid'
import TeamList from '../components/TeamGrid';

export default function Home({ projects, team, partners, contacts }) {
  return (
    <>
      <div id="about"></div>
      <Layout home menuItems={menuItems}>
        <Head>
          <title>Дизайн-код Екатеринбурга</title>
        </Head>

        <section>
          <p className={'site-description site-description_align-left'}>
            &laquo;Дизайн-код Екатеринбурга&raquo;&nbsp;&mdash; инициативный проект независимых дизайнеров города. Мы&nbsp;разрабатыва&shy;ем единые визуальные стандарты городской среды и&nbsp;внедряем их&nbsp;в&nbsp;жизнь.
          </p>
          <p className={'site-description site-description_align-right'}>
            Наша цель&nbsp;&mdash; сделать Екатеринбург уютным и&nbsp;комфортным, чтобы жите&shy;лям хотелось остаться, а&nbsp;гостям&raquo;&nbsp;&mdash;&nbsp;вернуться.
          </p>
        </section>

        <section id="projects">
          <h2 className={'section-heading'}>Проекты</h2>
          <PostPreviewGrid posts={projects} />
        </section>


        <section id="team">
          <h2 className={'section-heading'}>Команда</h2>

          <TeamList team={team} />
        </section>


        <section id="partners">
          <h2 className={'section-heading'}>Партнеры</h2>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
            {partners.map(({ link, name, image, description }) =>
              <div key={name}>
                <a href={link} target="_blank">
                  <Image src={image[0]} width={200} height={200} alt="" loading="eager" />
                </a>
              </div>
            )}
          </div>
        </section>

        <section id="contacts">
          <h2 className={'section-heading'}>Почта и соцсети</h2>

          {contacts.map(({ name, link }) =>
            <li key={name}><a href={link} target="_blank">{name}</a></li>
          )}
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: await getNotionDatabaseItems('Projects'),
      team: [
        ... await getNotionDatabaseItems('TeamOld'),
        ... await getNotionDatabaseItems('TeamNew')
      ],
      partners: await getNotionDatabaseItems('Partners'),
      contacts: await getNotionDatabaseItems('Сontacts')
    },
    revalidate: 60 * 60 * 24,
  }
}
