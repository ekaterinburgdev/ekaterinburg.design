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
          <div className={cx('partners__list-item')} key={link}>
            <a href={link} target="_blank">
              <img src={image[0]} alt="" className={cx('partners__logo')} loading="lazy"  />
            </a>
          </div>
        )}
      </div>

      <p className={cx('partners__description', 'partners__description_left')}>
        Мы&nbsp;создаём дизайн-систему Екатеринбурга, которая исключит появление плохого дизайна в&nbsp;городе. Это сделает городскую среду приятнее и&nbsp;комфортнее.
      </p>

      <p className={cx('partners__description', 'partners__description_right')}>
        Чтобы делать это быстрее и&nbsp;эффективнее, мы&nbsp;ищем инвесторов и&nbsp;спонсоров, которые готовы поддержать развитие дизайна Екатеринбурга.
      </p>

      <p className={cx('partners__description', 'partners__description_left')}>
        Обсудить условия и&nbsp;обязанности с&nbsp;нашей стороны с&nbsp;вами готов наш руководитель Паша Омелёхин&nbsp;&mdash; <a href="mailto:pasha@ekateringburg.design">pasha@ekateringburg.design</a>
      </p>
    </div>
  )
};

