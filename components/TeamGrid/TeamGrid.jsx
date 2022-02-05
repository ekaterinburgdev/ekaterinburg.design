import classNames from 'classnames/bind';

import TeamPerson from '../TeamPerson';

import styles from './TeamGrid.module.scss';

const cx = classNames.bind(styles);

export default function TeamGrid({ team }) {
  const sortBySurname = (a, b) => {
    const getSurname = (item) => item['имя'].split(' ').pop();
    const surnameA = getSurname(a);
    const surnameB = getSurname(b);

    if (surnameA < surnameB) { return -1; }
    if (surnameA > surnameB) { return 1; }
    return 0;
  }

  return (
    team && <ul className={cx("team-grid")}>
      {team
        ?.filter(({ ['показать на сайте']: published }) => published)
        .sort(sortBySurname)
        .map(({
          ['имя']: name,
          ['фото']: photo,
          ['ссылка на сайте']: link,
          ['должность на сайте']: role
        }) => (
          <li className={cx("team-grid__item")} key={name}>
            <TeamPerson
              name={name}
              role={role}
              photo={photo}
              link={link}
            />
          </li>
        ))}
    </ul>
  )
};
