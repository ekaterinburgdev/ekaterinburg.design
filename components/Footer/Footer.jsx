import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      Дизайн-код Екатеринбурга

      <div className={cx('footer__year')}>
        2017
        <div className={cx('footer__year-dash')}></div>
      </div>
    </footer>
  )
};
