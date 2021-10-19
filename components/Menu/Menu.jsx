import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export default function Menu({ items }) {
  return <>
    {items && (
      <ul className={cx('menu')}>
        {items.map(({ title, link }) =>
          <a href={link} className={cx('menu__item')}>{title}</a>
        )}
      </ul>
    )}
  </>
};
