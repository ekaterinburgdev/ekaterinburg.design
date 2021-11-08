import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      Дизайн-код Екатеринбурга · 2017–2021
    </footer>
  )
};
