import Head from 'next/head'

import getTeam from '../lib/data/team';
import getProjects from '../lib/data/projects';
import getPartners from '../lib/data/partners';
import getTextBlocks from '../lib/data/textBlocks';

import Layout from '../components/Layout'
import Menu from '../components/Menu'
import ProjectsList from '../components/ProjectsList'
import Map from '../components/Map';
import TeamGrid from '../components/TeamList';
import Contacts from '../components/Contacts';
import Partners from '../components/Partners/Partners';
import Cover from '../components/Cover';
import TextBlockComponent from '../components/TextBlock';

import menuItems from '../routes.json';

export default function Home({ textBlocks, projects, team, partners }) {
  const TextBlock = ({ name }) => <TextBlockComponent data={textBlocks} name={name} />

  return (
    <div className='wrap'>
      <Cover />
      <Layout home>
        <Head>
          <title>Дизайн-код Екатеринбурга</title>
        </Head>

        <Menu items={menuItems} />

        <section id="about" className={'section'}>
          <div className={'main-visual'}>
            <h2 className={'main-visual__title'}>
              <TextBlock name="MainVisualTitle" />
            </h2>
            <p className={'main-visual__description'}>
              <TextBlock name="MainVisualText" />

              <svg className={'main-visual__logo'} width="207" height="170" viewBox="0 0 207 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1696_932)">
                  <path d="M206.003 99.79C137.335 77.6443 68.6677 138.149 0 116.003V161.953C68.6677 184.099 137.335 123.594 206.003 145.74V99.79Z" fill="#00B4FF" />
                  <path d="M206.003 7.95005C137.335 -14.1957 68.6677 46.3086 0 24.1628V70.0828C68.6677 92.2286 137.335 31.7243 206.003 53.8701V7.95005Z" fill="#FFD400" />
                  <path d="M206.003 43.8701C137.335 21.7244 68.6677 82.2286 0 60.0829V126.003C68.6677 148.149 137.335 87.6444 206.003 109.79V43.8701Z" fill="#00B400" />
                </g>
                <defs>
                  <clipPath id="clip0_1696_932">
                    <rect width="206.64" height="153.66" fill="white" transform="matrix(0.996917 -0.0784591 0 1 0 16.2129)" />
                  </clipPath>
                </defs>
              </svg>
            </p>
          </div>
        </section>

        <section className={'section'} id="projects">
          <h2 className={'section__heading section__heading_projects'}>Дизайн-<br />система</h2>
          <p className={'section__subheader section__subheader_projects'}>
            <TextBlock data={textBlocks} name="MainProjectsText" />
          </p>
          <ProjectsList projects={projects} />
        </section>

        <section className={'section'} id="partners">
          <h2 className={'section__heading section__heading_map'}>
            <a href="https://map.ekaterinburg.design/" target="_blank">
              Наши работы<br />в&nbsp;городе
            </a>
          </h2>
          <Map widgetUrl="https://map.ekaterinburg.design/widget" />
        </section>

        <section className={'section'} id="partners">
          <h2 className={'section__heading section__heading_partners'}>Партнёры</h2>

          <Partners partners={partners} />
        </section>

        <section className={'section'} id="team">
          <h2 className={'section__heading section__heading_team'}>Команда</h2>

          <TeamGrid team={team} />
        </section>

        <section className={'section'} id="contacts">
          <h2 className={'section__heading section__heading_contacts'}>Почта<br />и соцсети</h2>

          <Contacts />
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: await getProjects(),
      team: await getTeam(),
      partners: await getPartners(),
      textBlocks: await getTextBlocks()
    }
  }
}
