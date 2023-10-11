import classNames from 'classnames/bind';

import TeamPerson from '../TeamPerson';

import styles from './TeamList.module.scss';

const cx = classNames.bind(styles);

export default function TeamGrid({ team }) {


  return (
    team && <ul className={cx("team-grid")}>
      {team.map(({ name, photo, link, role }) => (
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
