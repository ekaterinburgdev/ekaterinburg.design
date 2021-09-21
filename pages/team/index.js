import Layout from '../../components/Layout'
import Head from 'next/head'

const team = [
  {
    "link": "https://www.facebook.com/albydesign",
    "name": "Алексей Быков",
    "image": "https://ekaterinburg.design/data/team/lesha-userpic@2x.jpg",
    "role": "промышленный дизайнер"
  },
  {
    "link": "https://www.facebook.com/profile.php?id=100000719476103",
    "name": "Владислав Деревянных",
    "image": "https://ekaterinburg.design/data/team/vlad-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "link": "https://www.facebook.com/profile.php?id=100008241100470",
    "name": "Елена Габдлахатова",
    "image": "https://ekaterinburg.design/data/team/lena-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "name": "Мария Ермакова",
    "image": "https://ekaterinburg.design/data/team/maria-userpic@2x.jpg",
    "role": "директор информационно-туристической службы"
  },
  {
    "link": "https://omelekhin.ru/",
    "name": "Паша Омелёхин",
    "image": "https://ekaterinburg.design/data/team/pasha-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "link": "https://www.facebook.com/dimgafat",
    "name": "Дмитрий Фатхиев-Долохов",
    "image": "https://ekaterinburg.design/data/team/dima-userpic@2x.jpg",
    "role": "иллюстратор"
  },
  {
    "link": "https://www.facebook.com/profile.php?id=100002169084168",
    "name": "Дмитрий Фогель",
    "image": "https://ekaterinburg.design/data/team/dmitry-userpic@2x.jpg",
    "role": "главный художник города"
  },
  {
    "link": "https://www.facebook.com/mchereda",
    "name": "Михаил Череда",
    "image": "https://ekaterinburg.design/data/team/misha-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "link": "https://www.facebook.com/sergey.shashmurin.1",
    "name": "Сергей Шашмурин",
    "image": "https://ekaterinburg.design/data/team/serezha-userpic@2x.jpg",
    "role": "промышленный дизайнер"
  },
  {
    "link": "https://www.facebook.com/harrisov",
    "name": "Никита Харисов",
    "image": "https://ekaterinburg.design/data/team/nikita-userpic@2x.jpg",
    "role": "креативный директор «Атомстройкомплекса»"
  }
]

export default function Team() {
  return (
    <Layout>
      <Head>
        <title>Команда</title>
      </Head>
      {team.map(({ link, name, image, role }) => (
        <a href={link} target="_blank">
          <figure key={name}>
            <img src={image} alt={name} width={100} height={100} />
            <figcaption>{name}, {role}</figcaption>
          </figure>
        </a>
      ))}
    </Layout>
  )
}

