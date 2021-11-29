import classNames from 'classnames/bind';

import TeamPerson from '../TeamPerson';

import styles from './TeamGrid.module.scss';

const cx = classNames.bind(styles);

export default function TeamGrid({ team }) {
  return (
    team && <ul className={cx("team-grid")}>
      {team?.filter(({ ['должность на сайте'] : role }) => role !== 'undefined').map(({
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
