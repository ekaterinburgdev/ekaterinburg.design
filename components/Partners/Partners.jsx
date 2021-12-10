import classNames from 'classnames/bind';

import styles from './Partners.module.scss';

const cx = classNames.bind(styles);

export default function Partners({ partners }) {
  return (
    <div className={cx('partners')}>
      <div className={cx('partners__list')}>
        {
          // TODO Удалить name, description из Notion
        }
        {partners.map(({ link, name, image, description }) =>
          <div className={cx('partners__list-item')}>
            <a href={link} target="_blank">
              <img src={image[0]} alt=""  className={cx('partners__logo')} />
            </a>
          </div>
        )}
      </div>

      <p className={cx('partners__description')}>
        Мы всегда открыты новым специалистам и партнерам для&nbsp;сотрудничества — пишите нам на&nbsp;почту <a href="mailto:mail@ekaterinburg.design">mail@ekaterinburg.design</a>
      </p>
    </div>
  )
};

