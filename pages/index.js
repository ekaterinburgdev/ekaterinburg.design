import { getNotionDatabaseItems } from '../core/notion'

import Head from 'next/head'
import Image from 'next/image'

import menuItems from '../routes.json';

import Layout from '../components/Layout'
import PostPreviewGrid from '../components/PostPreviewGrid'
import TeamList from '../components/TeamGrid';
import Contacts from '../components/Contacts';

export default function Home({ projects, team, partners }) {
  return (
    <>
      <div id="about"></div>
      <Layout home menuItems={menuItems}>
        <Head>
          <title>Дизайн-код Екатеринбурга</title>
        </Head>

        <section className={'section'}>
          <p className={'site-description site-description_align-left'}>
            &laquo;Дизайн-код Екатеринбурга&raquo;&nbsp;&mdash; инициативный проект независимых дизайнеров города. Мы&nbsp;разрабатыва&shy;ем единые визуальные стандарты городской среды и&nbsp;внедряем их&nbsp;в&nbsp;жизнь.
          </p>
          <p className={'site-description site-description_align-right'}>
            Наша цель&nbsp;&mdash; сделать Екатеринбург уютным и&nbsp;комфортным, чтобы жите&shy;лям хотелось остаться, а&nbsp;гостям&raquo;&nbsp;&mdash;&nbsp;вернуться.
          </p>
        </section>

        <section className={'section'} id="projects">
          <h2 className={'section-heading section-heading_projects'}>Проекты</h2>
          <PostPreviewGrid posts={projects} />

          <h3 className={'section-heading section-heading_support-us'}>Поддержите<br />нас</h3>

          <p className={'support-description'}>
            Дизайн-код Екатеринбурга — инициативный проект независимых дизайнеров города.
            Мы разрабатываем единые визуальные стандарты городской среды и внедряем их в жизнь.
          </p>

          <a className={'support-link'} href="/">помочь проекту →</a>
        </section>

        <section id="team">
          <h2 className={'section-heading section-heading_team'}>Команда</h2>

          <TeamList team={team} />
        </section>


        <section className={'section'} id="partners">
          <h2 className={'section-heading section-heading_partners'}>Партнеры</h2>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
            {partners.map(({ link, name, image, description }) =>
              <div key={name}>
                <a href={link} target="_blank">
                  <Image src={image[0]} width={200} height={200} alt="" loading="eager" />
                </a>
              </div>
            )}
          </div>

          <p className="partners-text">
            Мы всегда открыты новым специалистам и партнерам для&nbsp;сотрудничества — пишите нам на&nbsp;почту <a href="mailto:mail@ekaterinburg.design">mail@ekaterinburg.design</a>
          </p>
        </section>

        <section className={'section'} id="contacts">
          <h2 className={'section-heading section-heading_contacts'}>Почта<br />и соцсети</h2>

          <Contacts />
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
      partners: await getNotionDatabaseItems('Partners')
    },
    revalidate: 60 * 60 * 24,
  }
}
