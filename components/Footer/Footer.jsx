import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer')}>
      Дизайн-код Екатеринбурга

      <div className={cx('footer__year')}>
        2017
        <div className={cx('footer__year-dash')} data-year={currentYear}></div>
      </div>
    </footer>
  )
};
