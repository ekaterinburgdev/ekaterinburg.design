import classNames from 'classnames/bind';

import styles from './Partners.module.scss';

const cx = classNames.bind(styles);

export default function Partners({ partners }) {
  return (
    <div className={cx('partners')}>
      <div className={cx('partners__list')}>
        {partners
          .map(({ link, name, logo, logoInvert }) =>
            <div className={cx('partners__list-item')} key={link}>
              <a className={cx('partners__link')} href={link} target="_blank">
                <img src={logoInvert[0]} alt="" className={cx('partners__logo')} />
                <img src={logo[0]} alt={name} className={cx('partners__logo', 'partners__logo_color')} loading="lazy" />
              </a>
            </div>
          )}
      </div>
    </div>
  )
};
