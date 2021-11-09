import classNames from 'classnames/bind';

import TeamPerson from '../TeamPerson';

import styles from './TeamGrid.module.scss';

const cx = classNames.bind(styles);

export default function TeamGrid({ team }) {
  return (
    team && <ul className={cx("team-grid")}>
      {team?.map(({ имя, роли, сайт, фото }) => (
        <li className={cx("team-grid__item")} key={имя}>
          {сайт
            ? (
              <a href={сайт} target="_blank">
                <TeamPerson name={имя} roles={роли} photo={фото} />
              </a>
            )
            : (
              <TeamPerson name={имя} roles={роли} photo={фото} />
            )}
        </li>
      ))}
    </ul>
  )
};
