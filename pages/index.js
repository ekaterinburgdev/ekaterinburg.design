import { useEffect } from 'react';

import { getNotionDatabaseItems } from '../core/notion'

import Head from 'next/head'

import menuItems from '../routes.json';

import Layout from '../components/Layout'
import Menu from '../components/Menu'
import PostPreviewGrid from '../components/PostPreviewGrid'
import TeamList from '../components/TeamGrid';
import Contacts from '../components/Contacts';
import Partners from '../components/Partners/Partners';
import Cover from '../components/Cover';

let handleScroll = null;

function debounce(method, delay) {
  clearTimeout(method._tId);
  method._tId = setTimeout(function(){
      method();
  }, delay);
}

export default function Home({ projects, team, partners }) {

  useEffect(() => {
    handleScroll = () => {
      const pageScrollPercent = window.scrollY / document.body.scrollHeight * 100;
      document.documentElement.style.setProperty('--page-scroll-percent', pageScrollPercent);
    };
    
    window.addEventListener("scroll", e => {
      debounce(handleScroll, 25);
    });
  }, []);

  return (
    <>
      <Cover />
      <Layout home>
        <Head>
          <title>Дизайн-код Екатеринбурга</title>
        </Head>

        <Menu items={menuItems} />

        <section id="about" className={'section'}>
          <div className={'main-visual'}>
            <h2 className={'main-visual__title'}>
              Мы — департамент<br />
              дизайна<br />
              Екатеринбурга
            </h2>
            <p className={'main-visual__description'}>
              Мы отвечаем за всю красоту, комфорт и уют и создаём самый приятный город в России.

              <svg className={'main-visual__logo'} width="207" height="170" viewBox="0 0 207 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1696_932)">
                <path d="M206.003 99.79C137.335 77.6443 68.6677 138.149 0 116.003V161.953C68.6677 184.099 137.335 123.594 206.003 145.74V99.79Z" fill="#00B4FF"/>
                <path d="M206.003 7.95005C137.335 -14.1957 68.6677 46.3086 0 24.1628V70.0828C68.6677 92.2286 137.335 31.7243 206.003 53.8701V7.95005Z" fill="#FFD400"/>
                <path d="M206.003 43.8701C137.335 21.7244 68.6677 82.2286 0 60.0829V126.003C68.6677 148.149 137.335 87.6444 206.003 109.79V43.8701Z" fill="#00B400"/>
                </g>
                <defs>
                <clipPath id="clip0_1696_932">
                  <rect width="206.64" height="153.66" fill="white" transform="matrix(0.996917 -0.0784591 0 1 0 16.2129)"/>
                </clipPath>
                </defs>
              </svg>
            </p>
          </div>
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
