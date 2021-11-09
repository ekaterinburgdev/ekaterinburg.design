import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './TeamPerson.module.scss';

const cx = classNames.bind(styles);

export default function TeamPerson({ name, roles, photo }) {
  return (
    <figure className={cx("team-person")}>
      {photo.length > 0 && <Image src={photo[0]} width={300} height={300} alt="" className={cx("team-person__photo")} />}

      <figcaption className={cx("team-person__caption")}>
        <div className={cx("team-person__name")}>
          {name}
        </div>
        <div className={cx("team-person__roles")}>
          {roles.map(x => x.toLowerCase()).join(', ')}
        </div>
      </figcaption>
    </figure>
  )
};
