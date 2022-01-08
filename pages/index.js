import { getNotionDatabaseItems } from '../core/notion'

import Head from 'next/head'
import Image from 'next/image'

import menuItems from '../routes.json';

import Layout from '../components/Layout'
import PostPreviewGrid from '../components/PostPreviewGrid'
import TeamList from '../components/TeamGrid';
import Contacts from '../components/Contacts';
import Partners from '../components/Partners/Partners';

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
            Мы&nbsp;&mdash; команда энтузиастов и&nbsp;самое большое дизайн-сообщество Екатеринбурга.
          </p>
          <p className={'site-description site-description_align-right'}>
            Мы&nbsp;делаем так, чтобы жителям из&nbsp;Екатеринбурга не&nbsp;хотелось уезжать, а&nbsp;гостям хотелось возвращаться и&nbsp;оставаться навсегда.
          </p>
          <p className={'site-description'}>
            Мы&nbsp;создаем дизайн-систему города и&nbsp;топим за&nbsp;красивую, комфортную и&nbsp;приятную жизнь в&nbsp;городской среде.
          </p>
        </section>

        <section className={'section'} id="projects">
          <h2 className={'section-heading section-heading_projects'}>Дизайн-<br />система</h2>
          <PostPreviewGrid posts={projects} />
        </section>


        <section className={'section'} id="partners">
          <h2 className={'section-heading section-heading_partners'}>Партнёры</h2>

          <Partners partners={partners} />
        </section>

        <section className={'section'} id="team">
          <h2 className={'section-heading section-heading_team'}>Команда</h2>

          <TeamList team={team} />
        </section>

        {/*
        <section className={'section'} id="donate">
          <h3 className={'section-heading section-heading_support-us'}>Поддержите<br />нас</h3>

          <p className={'support-description'}>
            Мы&nbsp;развиваем Дизайн-код Екатеринбурга за&nbsp;свой счёт, и&nbsp;нам не&nbsp;хватает средств для реализации объектов&nbsp;&mdash; изготовления адресных табличек, урн, навигационных стелл и&nbsp;других наших проектов.
          </p>

          <p className={'support-description'}>
            Если вы&nbsp;хотите помочь создать дизайн-систему Екатеринбурга, сделать жизнь в&nbsp;городе приятнее, комфортнее и&nbsp;красивее&nbsp;&mdash; поддержите нас.
          </p>

          <a className={'support-link'} href="/">помочь проекту →</a>
        </section>
        */}

        <section className={'section'} id="contacts">
          <h2 className={'section-heading section-heading_contacts'}>Почта<br />и соцсети</h2>

          <Contacts />
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      projects: await getNotionDatabaseItems('Projects'),
      team: await getNotionDatabaseItems('Team'),
      partners: await getNotionDatabaseItems('Partners')
    },
    //revalidate: 60,
  }
}
