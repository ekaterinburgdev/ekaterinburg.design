import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './TeamPerson.module.scss';

const cx = classNames.bind(styles);

export default function TeamPerson({ name, role, photo, link }) {
  const renderPerson = () => (
    <figure className={cx("team-person__inner", "emerge")}>
      {photo.length > 0 &&
        <div className={cx("team-person__photo")}>
          <img src={photo[0]} width={300} height={300} alt="" />
        </div>
      }
      <figcaption className={cx("team-person__caption")}>
        <div className={cx("team-person__name")}>
          {name}
        </div>
        <div className={cx("team-person__role")}>
          {role}
        </div>
      </figcaption>
    </figure>
  );

  return (
    link !== 'undefined'
      ? <a className={cx("team-person")} href={link}>{renderPerson()}</a>
      : <span className={cx("team-person")} >{renderPerson()}</span>
  )
};

